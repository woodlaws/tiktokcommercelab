import { permanentRedirect } from 'next/navigation';
export default function SellerContactRedirect() { permanentRedirect('/contact?type=creator'); }
