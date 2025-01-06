import EmbedBox from "./EmbedBox"

const builderStaticInputs = {
	details: [
		{ name: 'pageTitle', label: 'Page Heading', type: 'text' },
		{ name: 'tagline', label: 'Page Tagline', type: 'text' },
		{ name: 'heroImage', label: 'Hero Image', type: 'image' },
	],
	launch: [
		{ type: 'embed', component: <EmbedBox /> },
		{ name: 'subdomain', label: 'Subdomain for full-page hosting', type: 'text' },
	],
	style: [
		{ name: 'primaryBrandColor', label: 'Background Color', type: 'color' },
		{ name: 'textColor', label: 'Text color', type: 'color' },
		{ name: 'headingFont', label: 'Heading Text Font', type: 'text' },
		{ name: 'bodyFont', label: 'Body Text Font', type: 'text' },
	],
	form: [
		{ name: 'webhookUrl', label: 'Form Webhook URL - called on form submit', type: 'text', helperText: 'See our how-to section for more information on webhooks' },
		// { type: 'form', component: <FormBuilder /> },
	]
}

export default builderStaticInputs