const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ pageTitle }}</title></head>
<body>
  <header>
    <h1>{{ pageTitle }}</h1>
  </header>
  <main class="preview-main">
		<img src="{{ heroImage }}" alt="Hero Image">
  </main>
</body>
</html>`

export default template;
