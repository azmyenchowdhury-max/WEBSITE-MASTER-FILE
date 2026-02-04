/* ===================================
   Consultation Page JavaScript
   Payment & Consultation System
   Backend Database Integration
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Supabase Configuration
    const SUPABASE_URL = 'https://xtpvadsmapafzkhhnlio.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjFkYjI5NmJmLTczMzktNGU0Ny1iMjdmLThlNWYwOGZhOWQ4ZSJ9.eyJwcm9qZWN0SWQiOiJ4dHB2YWRzbWFwYWZ6a2hobmxpbyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcwMDA3MzkzLCJleHAiOjIwODUzNjczOTMsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.JQJq2LRDRaDvviKvPOyN0X3rKLCTTo06oSqjRauMJpg';
    
    // API Helper Function
    async function invokeEdgeFunction(functionName, body) {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/${functionName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'apikey': SUPABASE_ANON_KEY
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `API Error: ${response.status}`);
        }
        
        return response.json();
    }
    
    // State management
    let currentStep = 1;
    let isFirstTimeUser = true;
    let selectedPaymentMethod = null;
    let selectedConsultationType = 'office';
    let consultationFee = 2000;
    let currentTransactionId = null;
    let currentConsultationId = null;
    
    // DOM Elements
    const steps = document.querySelectorAll('.form-step');
    const stepItems = document.querySelectorAll('.step-item');
    const progressLine = document.getElementById('progressLine');
    
    // Set minimum date to today
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Check URL parameters for payment callback
    checkPaymentCallback();
    
    // ===== Step Navigation =====
    function showStep(stepNumber) {
        steps.forEach(step => step.classList.remove('active'));
        stepItems.forEach((item, index) => {
            item.classList.remove('active', 'completed');
            if (index + 1 < stepNumber) {
                item.classList.add('completed');
            } else if (index + 1 === stepNumber) {
                item.classList.add('active');
            }
        });
        
        const targetStep = document.getElementById('step' + stepNumber);
        if (targetStep) {
            targetStep.classList.add('active');
        }
        
        // Update progress line
        const progressPercent = ((stepNumber - 1) / 2) * 100;
        if (progressLine) {
            progressLine.style.width = progressPercent + '%';
        }
        
        currentStep = stepNumber;
        
        // Scroll to top of form
        document.querySelector('.consultation-form-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function showSuccess(consultationData = {}) {
        steps.forEach(step => step.classList.remove('active'));
        stepItems.forEach(item => item.classList.add('completed'));
        if (progressLine) {
            progressLine.style.width = '100%';
        }
        
        // Update confirmation details
        if (consultationData.firstName) {
            document.getElementById('confirmName').textContent = `${consultationData.firstName} ${consultationData.lastName || ''}`;
        }
        if (consultationData.caseType) {
            document.getElementById('confirmCaseType').textContent = consultationData.caseType;
        }
        if (consultationData.preferredDate) {
            document.getElementById('confirmDate').textContent = consultationData.preferredDate;
        }
        if (consultationData.preferredTime) {
            document.getElementById('confirmTime').textContent = consultationData.preferredTime;
        }
        if (consultationData.email) {
            document.getElementById('confirmEmail').textContent = consultationData.email;
        }
        
        // Show consultation ID if available
        if (consultationData.id) {
            const confirmationRef = document.getElementById('confirmationRef');
            if (confirmationRef) {
                confirmationRef.textContent = consultationData.id.substring(0, 8).toUpperCase();
            }
        }
        
        document.getElementById('stepSuccess').classList.add('active');
    }
    
    function showError(message) {
        // Create error toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification error';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
    
    function showNotification(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        const icon = type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${icon}"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
    
    // ===== Payment Callback Handler =====
    async function checkPaymentCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        const tranId = urlParams.get('tran_id');
        const demo = urlParams.get('demo');
        
        if (status && tranId) {
            // Show loading state
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = `
                <div class="loading-content">
                    <div class="spinner-border text-accent" role="status"></div>
                    <p class="mt-3">Verifying your payment...</p>
                </div>
            `;
            document.body.appendChild(loadingOverlay);
            
            try {
                // Verify payment with backend
                const verifyResult = await invokeEdgeFunction('payment-verify', {
                    transactionId: tranId,
                    status: status === 'success' ? 'VALID' : status,
                    valId: urlParams.get('val_id') || null
                });
                
                loadingOverlay.remove();
                
                if (verifyResult.success && verifyResult.verified) {
                    showNotification('Payment verified successfully!', 'success');
                    
                    // Show success with consultation data
                    const consultation = verifyResult.consultation || {};
                    showSuccess({
                        id: consultation.id,
                        firstName: consultation.first_name,
                        lastName: consultation.last_name,
                        caseType: consultation.practice_area,
                        email: consultation.email,
                        preferredDate: 'To be confirmed',
                        preferredTime: 'To be confirmed'
                    });
                } else {
                    showError('Payment verification failed. Please contact support.');
                    // Clear URL parameters
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            } catch (error) {
                loadingOverlay.remove();
                console.error('Payment verification error:', error);
                
                // For demo mode, simulate success
                if (demo === 'true') {
                    showNotification('Demo payment processed successfully!', 'success');
                    const storedData = sessionStorage.getItem('pendingConsultation');
                    if (storedData) {
                        const consultationData = JSON.parse(storedData);
                        showSuccess(consultationData);
                        sessionStorage.removeItem('pendingConsultation');
                    } else {
                        showSuccess({
                            firstName: 'Demo',
                            lastName: 'User',
                            caseType: 'Legal Consultation',
                            email: 'demo@example.com',
                            preferredDate: 'To be confirmed',
                            preferredTime: 'To be confirmed'
                        });
                    }
                } else {
                    showError('Unable to verify payment. Please contact support.');
                }
                
                // Clear URL parameters
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }
    
    // ===== Step 1: Eligibility Check =====
    const checkEligibilityBtn = document.getElementById('checkEligibility');
    if (checkEligibilityBtn) {
        checkEligibilityBtn.addEventListener('click', async function() {
            const email = document.getElementById('checkEmail').value.trim();
            const phone = document.getElementById('checkPhone').value.trim();
            
            if (!email || !phone) {
                showError('Please enter both email and phone number.');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address.');
                return;
            }
            
            // Validate Bangladesh phone number
            const phoneRegex = /^01[3-9]\d{8}$/;
            const cleanPhone = phone.replace(/[-\s+]/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                showError('Please enter a valid Bangladesh mobile number (e.g., 01XXX-XXXXXX).');
                return;
            }
            
            // Show loading state
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Checking...';
            this.disabled = true;
            
            try {
                // Call backend API to check consultation history
                const result = await invokeEdgeFunction('consultation-check', {
                    email: email,
                    phone: cleanPhone
                });
                
                isFirstTimeUser = !result.hasUsedFreeConsultation;
                consultationFee = result.consultationFee || 2000;
                
                // Update eligibility status
                const statusDiv = document.getElementById('eligibilityStatus');
                if (isFirstTimeUser) {
                    statusDiv.innerHTML = `
                        <div class="eligibility-free d-flex align-items-center">
                            <i class="fas fa-check-circle fa-2x me-3"></i>
                            <div>
                                <strong>Great news! You're eligible for a FREE consultation.</strong><br>
                                <small class="text-muted">This is your first consultation with us.</small>
                            </div>
                        </div>
                    `;
                    document.getElementById('paymentSection').style.display = 'none';
                    document.getElementById('submitBtnText').textContent = 'Schedule Consultation';
                } else {
                    statusDiv.innerHTML = `
                        <div class="eligibility-paid d-flex align-items-center">
                            <i class="fas fa-info-circle fa-2x me-3"></i>
                            <div>
                                <strong>Welcome back! A consultation fee applies.</strong><br>
                                <small class="text-muted">Consultation Fee: BDT ${consultationFee.toLocaleString()} (payable via bKash, Nagad, Rocket, or Card)</small>
                                <br><small class="text-muted">Previous consultations: ${result.consultationCount || 1}</small>
                            </div>
                        </div>
                    `;
                    document.getElementById('paymentSection').style.display = 'block';
                    document.getElementById('submitBtnText').textContent = 'Pay & Schedule';
                    
                    // Update fee display
                    const feeDisplay = document.querySelector('#paymentSection .text-accent');
                    if (feeDisplay) {
                        feeDisplay.textContent = `BDT ${consultationFee.toLocaleString()}`;
                    }
                }
                
                showNotification(isFirstTimeUser ? 'You qualify for a free consultation!' : 'Eligibility verified', 'success');
                
                // Go to step 2
                showStep(2);
                
            } catch (error) {
                console.error('Eligibility check error:', error);
                showError('Unable to verify eligibility. Please try again.');
            } finally {
                // Reset button
                this.innerHTML = 'Check Eligibility <i class="fas fa-arrow-right ms-2"></i>';
                this.disabled = false;
            }
        });
    }
    
    // ===== Step 2 Navigation =====
    const backToStep1Btn = document.getElementById('backToStep1');
    if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', () => showStep(1));
    }
    
    const goToStep3Btn = document.getElementById('goToStep3');
    if (goToStep3Btn) {
        goToStep3Btn.addEventListener('click', function() {
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const caseType = document.getElementById('caseType').value;
            const urgency = document.getElementById('urgency').value;
            const description = document.getElementById('caseDescription').value.trim();
            
            if (!firstName || !lastName || !caseType || !urgency || !description) {
                showError('Please fill in all required fields.');
                return;
            }
            
            if (description.length < 20) {
                showError('Please provide a more detailed description of your case (at least 20 characters).');
                return;
            }
            
            showStep(3);
        });
    }
    
    // ===== Step 3 Navigation =====
    const backToStep2Btn = document.getElementById('backToStep2');
    if (backToStep2Btn) {
        backToStep2Btn.addEventListener('click', () => showStep(2));
    }
    
    // ===== Consultation Type Selection =====
    const consultationTypeCards = document.querySelectorAll('.consultation-type-card');
    consultationTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            consultationTypeCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            selectedConsultationType = this.dataset.type;
        });
    });
    
    // ===== Payment Method Selection =====
    const paymentMethodCards = document.querySelectorAll('.payment-method-card');
    paymentMethodCards.forEach(card => {
        card.addEventListener('click', function() {
            paymentMethodCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            selectedPaymentMethod = this.dataset.method;
        });
    });
    
    // ===== Form Submission =====
    const submitBtn = document.getElementById('submitConsultation');
    if (submitBtn) {
        submitBtn.addEventListener('click', async function() {
            const preferredDate = document.getElementById('preferredDate').value;
            const preferredTime = document.getElementById('preferredTime').value;
            const termsCheck = document.getElementById('termsCheck').checked;
            
            if (!preferredDate || !preferredTime) {
                showError('Please select your preferred date and time.');
                return;
            }
            
            if (!termsCheck) {
                showError('Please agree to the Terms of Service and Privacy Policy.');
                return;
            }
            
            // If payment required, check payment method
            if (!isFirstTimeUser && !selectedPaymentMethod) {
                showError('Please select a payment method.');
                return;
            }
            
            // Gather form data
            const email = document.getElementById('checkEmail').value.trim();
            const phone = document.getElementById('checkPhone').value.replace(/[-\s+]/g, '');
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const caseType = document.getElementById('caseType').value;
            const urgency = document.getElementById('urgency').value;
            const description = document.getElementById('caseDescription').value.trim();
            const additionalNotes = document.getElementById('additionalNotes')?.value.trim() || '';
            
            const consultationData = {
                email,
                phone,
                firstName,
                lastName,
                practiceArea: caseType,
                message: `${description}\n\nUrgency: ${urgency}\nConsultation Type: ${selectedConsultationType}\nPreferred Date: ${preferredDate}\nPreferred Time: ${preferredTime}\n${additionalNotes ? 'Additional Notes: ' + additionalNotes : ''}`,
                preferredDate,
                preferredTime,
                consultationType: selectedConsultationType
            };
            
            // Show loading state
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
            this.disabled = true;
            
            try {
                if (isFirstTimeUser) {
                    // Submit free consultation
                    const result = await invokeEdgeFunction('submit-consultation', {
                        ...consultationData,
                        isFree: true
                    });
                    
                    if (result.success) {
                        showNotification('Consultation scheduled successfully!', 'success');
                        showSuccess({
                            id: result.consultation?.id,
                            firstName,
                            lastName,
                            caseType,
                            email,
                            preferredDate,
                            preferredTime
                        });
                    } else {
                        throw new Error(result.error || 'Failed to submit consultation');
                    }
                } else {
                    // Initiate payment for returning users
                    sessionStorage.setItem('pendingConsultation', JSON.stringify({
                        firstName,
                        lastName,
                        caseType,
                        email,
                        preferredDate,
                        preferredTime
                    }));
                    
                    const paymentResult = await invokeEdgeFunction('payment-initiate', {
                        ...consultationData,
                        returnUrl: window.location.href.split('?')[0],
                        paymentMethod: selectedPaymentMethod
                    });
                    
                    if (paymentResult.success) {
                        currentTransactionId = paymentResult.transactionId;
                        currentConsultationId = paymentResult.consultationId;
                        
                        showNotification('Redirecting to payment gateway...', 'info');
                        
                        // Redirect to payment gateway
                        if (paymentResult.gatewayUrl) {
                            setTimeout(() => {
                                window.location.href = paymentResult.gatewayUrl;
                            }, 1500);
                        } else {
                            // For demo, simulate successful payment
                            showNotification('Demo mode: Simulating payment...', 'warning');
                            setTimeout(() => {
                                window.location.href = `${window.location.pathname}?status=success&tran_id=${currentTransactionId}&demo=true`;
                            }, 2000);
                        }
                    } else {
                        throw new Error(paymentResult.error || 'Failed to initiate payment');
                    }
                }
            } catch (error) {
                console.error('Submission error:', error);
                showError(error.message || 'An error occurred. Please try again.');
                
                // Reset button
                this.innerHTML = `<span id="submitBtnText">${isFirstTimeUser ? 'Schedule Consultation' : 'Pay & Schedule'}</span><i class="fas fa-calendar-check ms-2"></i>`;
                this.disabled = false;
            }
        });
    }
    
    // ===== Add Toast Notification Styles =====
    const toastStyles = document.createElement('style');
    toastStyles.textContent = `
        .toast-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            transform: translateX(120%);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .toast-notification.show {
            transform: translateX(0);
        }
        
        .toast-notification.success {
            background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%);
            border-left: 4px solid #4CAF50;
        }
        
        .toast-notification.error {
            background: linear-gradient(135deg, #4a1a1a 0%, #5a2d2d 100%);
            border-left: 4px solid #f44336;
        }
        
        .toast-notification.warning {
            background: linear-gradient(135deg, #4a3a1a 0%, #5a4a2d 100%);
            border-left: 4px solid #ff9800;
        }
        
        .toast-notification.info {
            background: linear-gradient(135deg, #1a3a4a 0%, #2d4a5a 100%);
            border-left: 4px solid #2196F3;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #fff;
        }
        
        .toast-content i {
            font-size: 20px;
        }
        
        .toast-notification.success .toast-content i { color: #4CAF50; }
        .toast-notification.error .toast-content i { color: #f44336; }
        .toast-notification.warning .toast-content i { color: #ff9800; }
        .toast-notification.info .toast-content i { color: #2196F3; }
        
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 10, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
        }
        
        .loading-content {
            text-align: center;
            color: #fff;
        }
        
        .loading-content .spinner-border {
            width: 50px;
            height: 50px;
        }
        
        .text-accent {
            color: #AFA939 !important;
        }
        
        .eligibility-free {
            background: rgba(76, 175, 80, 0.1);
            border: 1px solid rgba(76, 175, 80, 0.3);
            border-radius: 8px;
            padding: 16px;
            color: #4CAF50;
        }
        
        .eligibility-free strong {
            color: #4CAF50;
        }
        
        .eligibility-paid {
            background: rgba(175, 169, 57, 0.1);
            border: 1px solid rgba(175, 169, 57, 0.3);
            border-radius: 8px;
            padding: 16px;
            color: #AFA939;
        }
        
        .eligibility-paid strong {
            color: #AFA939;
        }
    `;
    document.head.appendChild(toastStyles);
});
