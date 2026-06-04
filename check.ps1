$c = Get-Content -Raw -Path 'C:\Users\Digs\.gemini\antigravity\scratch\metodo-21-dias-no-topo\style.css'
$o = [regex]::Matches($c, '\{').Count
$cl = [regex]::Matches($c, '\}').Count
Write-Host "Open: $o, Close: $cl, Diff: $($o - $cl)"
