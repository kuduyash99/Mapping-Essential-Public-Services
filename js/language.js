let currentLanguage = "en";

const translations = {
    en: {
    title: "Find Essential Services Near You",
    description: "Find nearby hospitals, pharmacies, police stations, schools, banks, ATMs and civic services.",
    searchPlaceholder: "Search for a service...",
    findNearMe: "Find Near Me",

    essentialServices: "Essential Services",

    hospitals: "Hospitals",
    pharmacies: "Pharmacies",
    policeStations: "Police Stations",
    publicToilets: "Public Toilets",
    schools: "Schools",
    banks: "Banks",
    atms: "ATMs",
    civicServices: "Civic Services",
    otherServices: "Other Services",

    emergencyHelp: "Emergency Help",
    emergencyDescription: "Quickly access important emergency services.",
    callEmergency: "Call Emergency Services",
    nearestHospital: "Find Nearest Hospital",
    nearestPolice: "Find Nearest Police Station",

    nearbyServices: "Nearby Services",
    footer: "Community Engagement Project"
},
    mr: {
    title: "तुमच्या जवळील आवश्यक सेवा शोधा",
    description: "जवळील रुग्णालये, औषधालये, पोलीस ठाणे, शाळा, बँका, एटीएम आणि नागरी सेवा शोधा.",
    searchPlaceholder: "सेवा शोधा...",
    findNearMe: "माझ्या जवळ शोधा",

    essentialServices: "आवश्यक सेवा",

    hospitals: "रुग्णालये",
    pharmacies: "औषधालये",
    policeStations: "पोलीस ठाणे",
    publicToilets: "सार्वजनिक स्वच्छतागृहे",
    schools: "शाळा",
    banks: "बँका",
    atms: "एटीएम",
    civicServices: "नागरी सेवा",
    otherServices: "इतर सेवा",

    emergencyHelp: "आपत्कालीन मदत",
    emergencyDescription: "महत्त्वाच्या आपत्कालीन सेवांचा त्वरित वापर करा.",
    callEmergency: "आपत्कालीन सेवांना कॉल करा",
    nearestHospital: "जवळचे रुग्णालय शोधा",
    nearestPolice: "जवळचे पोलीस ठाणे शोधा",

    nearbyServices: "जवळील सेवा",
    footer: "समुदाय सहभाग प्रकल्प"
},
    hi: {
    title: "अपने पास आवश्यक सेवाएँ खोजें",
    description: "पास के अस्पताल, दवाखाने, पुलिस स्टेशन, स्कूल, बैंक, एटीएम और नागरिक सेवाएँ खोजें।",
    searchPlaceholder: "सेवा खोजें...",
    findNearMe: "मेरे पास खोजें",

    essentialServices: "आवश्यक सेवाएँ",

    hospitals: "अस्पताल",
    pharmacies: "दवाखाने",
    policeStations: "पुलिस स्टेशन",
    publicToilets: "सार्वजनिक शौचालय",
    schools: "स्कूल",
    banks: "बैंक",
    atms: "एटीएम",
    civicServices: "नागरिक सेवाएँ",
    otherServices: "अन्य सेवाएँ",

    emergencyHelp: "आपातकालीन सहायता",
    emergencyDescription: "महत्वपूर्ण आपातकालीन सेवाओं का तुरंत उपयोग करें।",
    callEmergency: "आपातकालीन सेवाओं को कॉल करें",
    nearestHospital: "निकटतम अस्पताल खोजें",
    nearestPolice: "निकटतम पुलिस स्टेशन खोजें",

    nearbyServices: "आस-पास की सेवाएँ",
    footer: "सामुदायिक सहभागिता परियोजना"
}
};
function applyLanguage() {
    const language = translations[currentLanguage];

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (language[key]) {
            element.textContent = language[key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const key = element.dataset.i18nPlaceholder;

        if (language[key]) {
            element.placeholder = language[key];
        }
    });
}


const languageSelect = document.getElementById("languageSelect");

languageSelect.addEventListener("change", () => {

    currentLanguage = languageSelect.value;

    applyLanguage();
});


applyLanguage();