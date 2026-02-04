# PowerShell script to add links to attorney cards
$files = @('attorney-kabir.html', 'attorney-rashed.html', 'attorney-mahadi.html')

$attorneyMappings = @{
    'Mohammed Mostofa Kamal' = 'attorney-kamal.html'
    'Nasrin Akter' = 'attorney-nasrin.html'
    'Harun Rayhan' = 'attorney-harun.html'
    'Mustafa Kamal Chowdhury' = 'attorney-mustafa.html'
    'Mohammad Kabir' = 'attorney-kabir.html'
    'Rashed' = 'attorney-rashed.html'
    'Mahadi' = 'attorney-mahadi.html'
}

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw

        # Process each attorney
        foreach ($attorney in $attorneyMappings.Keys) {
            $link = $attorneyMappings[$attorney]

            # Find the comment and the following attorney card
            $commentPattern = "<!-- $attorney -->"
            $cardPattern = '<div class="attorney-card-compact">(.*?)</div>\s*</div>'

            # Use a more direct approach - replace the attorney card div with a linked version
            $content = $content -replace "(<!-- $attorney -->\s*<div class=`"col-lg-4 col-md-6`">\s*)(<div class=`"attorney-card-compact`">.*?</div>)(\s*</div>)", "`$1<a href=`"$link`" class=`"attorney-card-link`">`$2</a>`$3"
        }

        Set-Content $file $content
        Write-Host "Updated $file"
    }
}

Write-Host "All remaining attorney profile pages have been updated with clickable attorney cards!"