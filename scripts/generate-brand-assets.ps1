param([string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot))

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing.Common

$cyan = [System.Drawing.ColorTranslator]::FromHtml("#25F4EE")
$pink = [System.Drawing.ColorTranslator]::FromHtml("#FE2C55")
$white = [System.Drawing.ColorTranslator]::FromHtml("#F7F8F9")
$muted = [System.Drawing.ColorTranslator]::FromHtml("#A7AAB2")
$black = [System.Drawing.ColorTranslator]::FromHtml("#050607")

function New-RoundedPath([float]$x, [float]$y, [float]$width, [float]$height, [float]$radius) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $diameter = $radius * 2
  $path.AddArc($x, $y, $diameter, $diameter, 180, 90)
  $path.AddArc($x + $width - $diameter, $y, $diameter, $diameter, 270, 90)
  $path.AddArc($x + $width - $diameter, $y + $height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($x, $y + $height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function Fill-RoundedRect($graphics, $brush, [float]$x, [float]$y, [float]$width, [float]$height, [float]$radius) {
  $path = New-RoundedPath $x $y $width $height $radius
  $graphics.FillPath($brush, $path)
  $path.Dispose()
}

function Draw-RoundedRect($graphics, $pen, [float]$x, [float]$y, [float]$width, [float]$height, [float]$radius) {
  $path = New-RoundedPath $x $y $width $height $radius
  $graphics.DrawPath($pen, $path)
  $path.Dispose()
}

function Draw-Monogram($graphics, [float]$x, [float]$y, [float]$size) {
  $scale = $size / 512.0
  $background = [System.Drawing.SolidBrush]::new($black)
  Fill-RoundedRect $graphics $background $x $y $size $size (116 * $scale)
  $background.Dispose()
  $border = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(32, 255, 255, 255), [Math]::Max(1, 4 * $scale))
  Draw-RoundedRect $graphics $border ($x + 18 * $scale) ($y + 18 * $scale) ($size - 36 * $scale) ($size - 36 * $scale) (101 * $scale)
  $border.Dispose()
  $stroke = [Math]::Max(2.2, 64 * $scale)
  foreach ($layer in @(
    @{ Color = $cyan; Offset = -13 * $scale },
    @{ Color = $pink; Offset = 13 * $scale },
    @{ Color = $white; Offset = 0 }
  )) {
    $pen = [System.Drawing.Pen]::new($layer.Color, $stroke)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $ox = $x + $layer.Offset
    $graphics.DrawArc($pen, $ox + 99 * $scale, $y + 119 * $scale, 274 * $scale, 274 * $scale, 52, 256)
    $graphics.DrawLine($pen, $ox + 292 * $scale, $y + 145 * $scale, $ox + 292 * $scale, $y + 365 * $scale)
    $graphics.DrawLine($pen, $ox + 292 * $scale, $y + 365 * $scale, $ox + 391 * $scale, $y + 365 * $scale)
    $pen.Dispose()
  }
}

function Save-IconPng([int]$size, [string]$path) {
  $bitmap = [System.Drawing.Bitmap]::new($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  Draw-Monogram $graphics 0 0 $size
  $directory = Split-Path -Parent $path
  if (-not (Test-Path $directory)) { New-Item -ItemType Directory -Path $directory | Out-Null }
  $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()
}

function Draw-Text($graphics, [string]$text, [float]$x, [float]$y, [float]$size, $color, [bool]$bold = $false) {
  $style = if ($bold) { [System.Drawing.FontStyle]::Bold } else { [System.Drawing.FontStyle]::Regular }
  $font = [System.Drawing.Font]::new("Malgun Gothic", $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
  $brush = [System.Drawing.SolidBrush]::new($color)
  $format = [System.Drawing.StringFormat]::new()
  $format.FormatFlags = [System.Drawing.StringFormatFlags]::NoWrap
  $graphics.DrawString($text, $font, $brush, $x, $y, $format)
  $format.Dispose()
  $brush.Dispose()
  $font.Dispose()
}

function New-OgImage([string]$fileName, [string[]]$headline, [string]$eyebrow) {
  $width = 1200
  $height = 630
  $bitmap = [System.Drawing.Bitmap]::new($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $graphics.Clear($black)
  $bgRect = [System.Drawing.RectangleF]::new(0, 0, $width, $height)
  $gradient = [System.Drawing.Drawing2D.LinearGradientBrush]::new($bgRect, [System.Drawing.Color]::FromArgb(255, 5, 6, 7), [System.Drawing.Color]::FromArgb(255, 11, 19, 24), 15)
  $graphics.FillRectangle($gradient, $bgRect)
  $gradient.Dispose()
  $gridPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(12, 255, 255, 255), 1)
  for ($gx = 0; $gx -le $width; $gx += 60) { $graphics.DrawLine($gridPen, $gx, 0, $gx, $height) }
  for ($gy = 0; $gy -le $height; $gy += 60) { $graphics.DrawLine($gridPen, 0, $gy, $width, $gy) }
  $gridPen.Dispose()
  $cyanGlow = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(20, 37, 244, 238))
  $pinkGlow = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(24, 254, 44, 85))
  $graphics.FillEllipse($cyanGlow, 760, -180, 560, 560)
  $graphics.FillEllipse($pinkGlow, 720, 360, 520, 320)
  $cyanGlow.Dispose()
  $pinkGlow.Dispose()
  Draw-Monogram $graphics 76 54 88
  Draw-Text $graphics "TIKTOK COMMERCE LAB" 188 66 24 $white $true
  Draw-Text $graphics "독립 틱톡커머스 전문 플랫폼" 188 102 17 $muted $false
  $tagBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(26, 37, 244, 238))
  Fill-RoundedRect $graphics $tagBrush 76 172 255 38 19
  $tagBrush.Dispose()
  Draw-Text $graphics $eyebrow 95 181 14 $cyan $true
  $headlineSize = if ($headline.Count -gt 1) { 50 } else { 54 }
  $headlineY = 232
  foreach ($line in $headline) {
    Draw-Text $graphics $line 76 $headlineY $headlineSize $white $true
    $headlineY += 68
  }
  $strapY = if ($headline.Count -gt 1) { 385 } else { 330 }
  Draw-Text $graphics "콘텐츠에서 구매까지" 76 $strapY 27 $white $true
  Draw-Text $graphics "틱톡커머스 성장을 설계합니다" 76 ($strapY + 40) 27 $white $true
  Draw-Text $graphics "틱톡샵 · 숏폼 · 라이브 · 크리에이터 · 광고 · 교육" 76 496 19 $muted $false
  Draw-Text $graphics "독립 틱톡커머스 교육·마케팅 플랫폼" 76 572 16 ([System.Drawing.Color]::FromArgb(145, 255, 255, 255)) $false
  $cardBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(220, 16, 19, 24))
  $cardPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(32, 255, 255, 255), 1)
  Fill-RoundedRect $graphics $cardBrush 820 142 300 154 24
  Draw-RoundedRect $graphics $cardPen 820 142 300 154 24
  Draw-Text $graphics "SHORTFORM" 844 165 13 $cyan $true
  $frameBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 26, 30, 38))
  Fill-RoundedRect $graphics $frameBrush 844 198 58 76 13
  Fill-RoundedRect $graphics $frameBrush 916 198 58 76 13
  Fill-RoundedRect $graphics $frameBrush 988 198 108 32 11
  Fill-RoundedRect $graphics $frameBrush 988 242 78 12 6
  $frameBrush.Dispose()
  Fill-RoundedRect $graphics $cardBrush 790 322 330 188 24
  Draw-RoundedRect $graphics $cardPen 790 322 330 188 24
  Draw-Text $graphics "LIVE COMMERCE" 816 345 13 $pink $true
  $bagPen = [System.Drawing.Pen]::new($white, 5)
  $graphics.DrawRectangle($bagPen, 818, 394, 54, 64)
  $graphics.DrawArc($bagPen, 828, 377, 34, 34, 180, 180)
  $graphPen = [System.Drawing.Pen]::new($cyan, 6)
  $graphPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $graphPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $graphics.DrawLines($graphPen, [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new(914, 452), [System.Drawing.PointF]::new(950, 429),
    [System.Drawing.PointF]::new(986, 440), [System.Drawing.PointF]::new(1048, 385)
  ))
  $graphics.DrawLine($graphPen, 1025, 385, 1048, 385)
  $graphics.DrawLine($graphPen, 1048, 385, 1048, 408)
  $bagPen.Dispose()
  $graphPen.Dispose()
  $cardPen.Dispose()
  $cardBrush.Dispose()
  $topPen = [System.Drawing.Pen]::new($cyan, 4)
  $bottomPen = [System.Drawing.Pen]::new($pink, 4)
  $graphics.DrawLine($topPen, 0, 0, 520, 0)
  $graphics.DrawLine($bottomPen, 680, 628, 1200, 628)
  $topPen.Dispose()
  $bottomPen.Dispose()
  $path = Join-Path $ProjectRoot "public/$fileName"
  $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()
}

$iconOutputs = @(
  @{ Size = 512; Path = "app/icon.png" }, @{ Size = 180; Path = "app/apple-icon.png" },
  @{ Size = 16; Path = "public/favicon-16x16.png" }, @{ Size = 32; Path = "public/favicon-32x32.png" },
  @{ Size = 180; Path = "public/apple-touch-icon.png" }, @{ Size = 192; Path = "public/android-chrome-192x192.png" },
  @{ Size = 512; Path = "public/android-chrome-512x512.png" }
)
foreach ($output in $iconOutputs) { Save-IconPng $output.Size (Join-Path $ProjectRoot $output.Path) }
$icoBitmap = [System.Drawing.Bitmap]::FromFile((Join-Path $ProjectRoot "public/favicon-32x32.png"))
$icon = [System.Drawing.Icon]::FromHandle($icoBitmap.GetHicon())
$stream = [System.IO.File]::Create((Join-Path $ProjectRoot "public/favicon.ico"))
$icon.Save($stream)
$stream.Dispose()
$icon.Dispose()
$icoBitmap.Dispose()

$ogCards = @(
  @{ File = "og.png"; Eyebrow = "TIKTOK COMMERCE"; Lines = @("틱톡커머스의 모든 것") },
  @{ File = "og-tiktok-commerce-lab.png"; Eyebrow = "TIKTOK COMMERCE"; Lines = @("틱톡커머스의 모든 것") },
  @{ File = "og-tiktok-shop-korea.png"; Eyebrow = "TIKTOK SHOP KOREA"; Lines = @("한국 틱톡샵 진출 가이드") },
  @{ File = "og-commerce-insights.png"; Eyebrow = "COMMERCE INSIGHTS"; Lines = @("틱톡커머스 최신 정보와", "실전 전략") },
  @{ File = "og-seller-academy.png"; Eyebrow = "SELLER ACADEMY"; Lines = @("틱톡샵 셀러의 시작부터", "성장까지") },
  @{ File = "og-brand-growth.png"; Eyebrow = "BRAND GROWTH"; Lines = @("발견되는 브랜드에서", "판매되는 브랜드로") },
  @{ File = "og-live-agency.png"; Eyebrow = "LIVE AGENCY"; Lines = @("라이브 한 번이 아닌", "반복 판매 시스템") },
  @{ File = "og-cases.png"; Eyebrow = "GROWTH RECORDS"; Lines = @("틱톡커머스 실행과", "성장 기록") },
  @{ File = "og-free-class.png"; Eyebrow = "FREE CLASS"; Lines = @("틱톡커머스 무료특강") }
)
foreach ($card in $ogCards) { New-OgImage $card.File $card.Lines $card.Eyebrow }
Write-Output "Generated $($iconOutputs.Count + $ogCards.Count + 1) brand assets."
