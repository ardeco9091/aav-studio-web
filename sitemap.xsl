<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8"/>
  <xsl:template match="/">
    <html lang="es">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap | AAV Studio</title>
        <style>
          :root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;padding:48px 24px;background:#050b14;color:#dbeafe;font:16px/1.5 system-ui,-apple-system,Segoe UI,sans-serif}main{max-width:980px;margin:auto}header{display:flex;justify-content:space-between;align-items:end;gap:24px;margin-bottom:28px}h1{margin:0;color:#fff;font-size:clamp(2rem,5vw,3.5rem);letter-spacing:-.04em}p{margin:8px 0 0;color:#94a3b8}.badge{color:#22d3ee;font:700 12px ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:.16em;text-transform:uppercase}table{width:100%;border-collapse:separate;border-spacing:0;overflow:hidden;border:1px solid #1f2937;border-radius:16px;background:#0b1220}th,td{text-align:left;padding:16px 18px;border-bottom:1px solid #1f2937}th{color:#67e8f9;background:#111c2f;font-size:12px;text-transform:uppercase;letter-spacing:.12em}tr:last-child td{border-bottom:0}a{color:#e0f2fe;text-decoration:none;word-break:break-word}a:hover{color:#22d3ee}td:last-child{color:#94a3b8;white-space:nowrap}@media(max-width:640px){header{display:block}th:nth-child(2),td:nth-child(2){display:none}td{padding:13px 12px}}
        </style>
      </head>
      <body><main>
        <header><div><div class="badge">AAV Studio · XML sitemap</div><h1>Mapa del sitio</h1><p>Rutas públicas disponibles para buscadores y visitantes.</p></div><p><xsl:value-of select="count(urlset/url)"/> URLs</p></header>
        <table><thead><tr><th>URL</th><th>Última actualización</th><th>Prioridad</th></tr></thead><tbody>
          <xsl:for-each select="urlset/url"><tr><td><a href="{loc}"><xsl:value-of select="loc"/></a></td><td><xsl:value-of select="lastmod"/></td><td><xsl:value-of select="priority"/></td></tr></xsl:for-each>
        </tbody></table>
      </main></body>
    </html>
  </xsl:template>
</xsl:stylesheet>
