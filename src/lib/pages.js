import BlogPage from "../components/pages/BlogPage";
import CaseStudiesPage from "../components/pages/CaseStudiesPage";
import FeaturesPage from "../components/pages/FeaturesPage";
import PricingPage from "../components/pages/PricingPage";
import UseCasesPage from "../components/pages/UseCasesPage";

const pages = [
	{ title: 'Features', path: '/features', element: FeaturesPage }, 
	{ title: 'Use Cases', path: '/use-cases', element: UseCasesPage }, 
	{ title: 'Blog', path: '/blog', element: BlogPage }, 
	{ title: 'Case Studies', path: '/case-studies', element: CaseStudiesPage }, 
	{ title: 'Pricing', path: '/pricing', element: PricingPage }
];
export default pages;