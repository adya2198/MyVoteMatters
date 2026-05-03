import { FileText, Search, MapPin, Download } from 'lucide-react';

export const services = [
  {
    id: "register",
    title: "Register as Voter (Form 6)",
    description: "Apply online for new voter registration. You will need to sign up/login first.",
    icon: FileText,
    url: "https://voters.eci.gov.in/signup",
    color: "#FF9933" // Saffron
  },
  {
    id: "check-name",
    title: "Search in Electoral Roll",
    description: "Check if your name is on the voter list using EPIC number or Details.",
    icon: Search,
    url: "https://electoralsearch.eci.gov.in/",
    color: "#138808" // Green
  },
  {
    id: "find-booth",
    title: "Know Your Polling Station",
    description: "Find your exact polling booth location and BLO details.",
    icon: MapPin,
    url: "https://electoralsearch.eci.gov.in/pollingstation",
    color: "#2563EB" // Blue
  },
  {
    id: "download-slip",
    title: "Download e-EPIC",
    description: "Download a digital PDF copy of your Voter ID card.",
    icon: Download,
    url: "https://voters.eci.gov.in/login",
    color: "#8B5CF6" // Purple
  }
];
