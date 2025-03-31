import EmbedBox from "./EmbedBox"

import EditNoteIcon from '@mui/icons-material/EditNote';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ContactsIcon from '@mui/icons-material/Contacts';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

const builderStaticInputs = {
	details: {
    icon: EditNoteIcon,
    elements: [
      { name: 'pageTitle', label: 'Page Heading', type: 'text' },
      { name: 'tagline', label: 'Page Tagline', type: 'text' },
      { name: 'heroImage', label: 'Hero Image', type: 'image' },
    ]
  },
	form: {
    icon: ContactsIcon,
    elements: [
      { name: 'webhookUrl', label: 'Form Webhook URL - called on form submit', type: 'text', helperText: 'See our how-to section for more information on webhooks' },
      // { type: 'form', component: <FormBuilder /> },
    ]
  },
	style: {
    icon: FormatColorFillIcon,
    elements: [
      { name: 'primaryBrandColor', label: 'Background Color', type: 'color' },
      { name: 'headingTextColor', label: 'Heading Text Color', type: 'color' },
      { name: 'bodyTextColor', label: 'Body Text Color', type: 'color' },
      { name: 'headingTextFont', label: 'Heading Text Font', type: 'font' },
      { name: 'bodyTextFont', label: 'Body Text Font', type: 'font' },
    ]
  },
	launch: {
    icon: RocketLaunchIcon,
    elements: [
      { type: 'embed', component: <EmbedBox /> },
      { name: 'subdomain', label: 'Site subdomain', type: 'text', helperText: 'Subdomain for full-site hosting' },
    ]
  },
}

export default builderStaticInputs