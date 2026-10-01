import { WomenScheme, SchemeCardData, SchemeActionLink, SchemeLinkType, ActiveSchemeContext } from '../types';

export const VERIFIED_WOMEN_SCHEMES: WomenScheme[] = [
  {
    id: 'pmmvy',
    schemeName: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    officialName: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    nameTa: 'பிரதான் மந்திரி மாத்ரு வந்தனா யோஜனா (பேறுகால உதவி)',
    description: 'Direct cash assistance of ₹5,000 for 1st child and ₹6,000 for 2nd girl child for pregnant women and lactating mothers.',
    descriptionTa: 'கர்ப்பிணி மற்றும் பாலூட்டும் தாய்மார்களுக்கு சத்தான உணவு மற்றும் மருத்துவ தேவைக்கான ₹5,000 / ₹6,000 நேரடி நிதியுதவி திட்டம்.',
    simpleDescription: 'Cash assistance for pregnant women and lactating mothers for health, nutrition, and partial wage compensation.',
    simpleDescriptionTa: 'கர்ப்பிணி மற்றும் பாலூட்டும் தாய்மார்களுக்கு சத்தான உணவு மற்றும் மருத்துவ தேவைக்கான ₹5,000 / ₹6,000 நேரடி நிதியுதவி திட்டம்.',
    category: 'pregnancy_maternity',
    categoryLabel: 'Pregnancy & Maternity Support',
    whoItIsFor: 'Pregnant women and lactating mothers for 1st living child or 2nd girl child in eligible families.',
    whoItIsForTa: 'தகுதியுள்ள குடும்பங்களைச் சேர்ந்த கர்ப்பிணி மற்றும் பாலூட்டும் தாய்மார்கள் (முதல் குழந்தை அல்லது இரண்டாவது பெண் குழந்தை).',
    importantEligibility: [
      'Age 19 years or above at registration',
      'First living child (₹5,000 in 2 installments: ₹3,000 at early ANC, ₹2,000 after birth & vaccination)',
      'Second child if girl child (₹6,000 in single installment after birth & vaccination)',
      'Family must belong to eligible socioeconomic category (BPL, EWS, MGNREGA, PM-JAY, SC/ST, disability, or low income)',
      'Not employed in regular Central/State government or PSU with paid maternity leave',
    ],
    importantEligibilityTa: [
      'பதிவின் போது வயது 19 அல்லது அதற்கு மேல் இருக்க வேண்டும்',
      'முதல் குழந்தை அல்லது இரண்டாவது பெண் குழந்தை',
      'அரசு நிர்ணயித்த தகுதி வரம்புக்குள் உள்ள குடும்பம்',
      'அரசு நிரந்தர பணியில் பேறுகால விடுப்பு பெறுபவராக இருக்கக்கூடாது',
    ],
    majorBenefit: '₹5,000 direct bank transfer for first child in 2 installments; ₹6,000 for second girl child.',
    majorBenefitTa: 'முதல் குழந்தைக்கு ₹5,000 (2 தவணைகளில்) / இரண்டாவது பெண் குழந்தைக்கு ₹6,000 வங்கி கணக்கில் நேரடியாக செலுத்தப்படுகிறது.',
    applicationMethod: 'Online via Citizen Login on official pmmvy.wcd.gov.in portal or free assisted registration through local Anganwadi Worker (AWW) / ASHA worker.',
    applicationMethodTa: 'அதிகாரப்பூர்வ pmmvy.wcd.gov.in தளத்தில் Citizen Login வழியாக அல்லது உங்கள் பகுதி அங்கன்வாடி / ஆஷா பணியாளர் மூலமாக இலவசமாக விண்ணப்பிக்கலாம்.',
    officialWebsite: 'https://pmmvy.wcd.gov.in',
    officialDepartment: 'Ministry of Women and Child Development, Government of India',
    officialInfoUrl: 'https://www.wcd.gov.in/women/pradhan-mantri-matru-vandana-yojna',
    officialSourceUrl: 'https://www.wcd.gov.in/women/pradhan-mantri-matru-vandana-yojna',
    sourceUrl: 'https://www.wcd.gov.in/women/pradhan-mantri-matru-vandana-yojna',
    officialApplicationUrl: 'https://pmmvy.wcd.gov.in',
    officialStatusUrl: 'https://pmmvy.wcd.gov.in',
    applicationUrl: 'https://pmmvy.wcd.gov.in',
    eligibilityUrl: 'https://www.wcd.gov.in/women/pradhan-mantri-matru-vandana-yojna',
    statusUrl: 'https://pmmvy.wcd.gov.in',
    grievanceUrl: 'https://pgportal.gov.in',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['pregnant', 'pregnancy', 'maternity', 'mother', 'child', 'baby', 'pmmvy', 'lactating', 'கர்ப்பம்', 'தாய்', 'குழந்தை', 'பேறுகாலம்', 'கர்ப்பிணி'],
  },
  {
    id: 'one-stop-centre',
    schemeName: 'One Stop Centre (Sakhi)',
    officialName: 'One Stop Centre (Sakhi) Scheme',
    nameTa: 'ஒரு நிறுத்த மையம் (சகி) & மகளிர் உதவி எண் 181',
    description: 'Integrated emergency response, police assistance, medical treatment, legal aid, counselling, and temporary shelter for women facing violence or distress.',
    descriptionTa: 'வன்முறை, குடும்ப துன்புறுத்தல், அச்சுறுத்தல் அல்லது ஆபத்தில் உள்ள பெண்களுக்கு 24 மணி நேர காவல்துறை உதவி, மருத்துவ சிகிச்சை, இலவச சட்ட உதவி மற்றும் தற்காலிக தங்குமிடம்.',
    simpleDescription: '24/7 toll-free emergency response, police assistance, medical help, legal aid, and counseling for women in distress.',
    simpleDescriptionTa: 'அவசர உதவி, மருத்துவ சிகிச்சை, சட்ட உதவி, மனநல ஆலோசனை மற்றும் தற்காலிக தங்குமிடம் தேவைப்படும் பெண்களுக்கு 24 மணி நேர இலவச உதவி.',
    category: 'safety_support',
    categoryLabel: "Women's Safety & Distress Support",
    whoItIsFor: 'Any woman facing violence, domestic harassment, abuse, distress, or needing immediate emergency protection and shelter.',
    whoItIsForTa: 'பாதுகாப்பு, உதவி அல்லது அவசர ஆலோசனை தேவைப்படும் எந்த ஒரு பெண்ணும் (குடும்ப வன்முறை அல்லது துன்புறுத்தல்).',
    importantEligibility: [
      'Universal access to all women and girls affected by violence in private or public spaces',
      'No income, age, religion, or documentation barrier to receive immediate emergency assistance',
      '24 hours a day, 7 days a week toll-free access via Helpline 181 or physical visit to district OSC',
    ],
    importantEligibilityTa: [
      'அனைத்து பெண்களுக்கும் வயது, வருமான வரம்பின்றி இலவச உடனடி சேவை',
      '24 மணி நேரமும் 181 என்ற இலவச எண்ணை தொடர்பு கொள்ளலாம்',
    ],
    majorBenefit: 'Immediate integrated emergency response, police help, medical aid, legal counseling, and up to 5 days safe temporary shelter under one roof.',
    majorBenefitTa: '181 அழைப்பு மூலம் உடனடி அவசர உதவி, காவல்துறை உதவி, இலவச சட்ட உதவி மற்றும் மாவட்ட சகி மையத்தில் தற்காலிக தங்குமிடம்.',
    applicationMethod: 'Dial 24/7 toll-free phone number 181 from any mobile/landline, or walk in directly to the nearest District One Stop Centre (Sakhi).',
    applicationMethodTa: 'எந்த போனிலிருந்தும் 181 என்ற இலவச எண்ணை உடனடியாக அழைக்கலாம் அல்லது மாவட்ட சகி மையத்திற்கு நேரடியாக செல்லலாம்.',
    officialWebsite: 'https://wcd.gov.in/offerings/one-stop-centre-scheme',
    officialDepartment: 'Ministry of Women and Child Development, Government of India',
    officialInfoUrl: 'https://wcd.gov.in/offerings/one-stop-centre-scheme',
    officialSourceUrl: 'https://wcd.gov.in/offerings/one-stop-centre-scheme',
    sourceUrl: 'https://wcd.gov.in/offerings/one-stop-centre-scheme',
    officialApplicationUrl: null,
    officialStatusUrl: null,
    applicationUrl: undefined,
    eligibilityUrl: 'https://wcd.gov.in/offerings/one-stop-centre-scheme',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['violence', 'domestic violence', 'violence at home', 'abuse', 'distress', 'emergency', 'safety', 'harassment', 'legal help', 'police', 'counselling', 'shelter', 'one stop centre', 'sakhi', '181', 'பாதுகாப்பு', 'வன்முறை', 'உதவி எண்', 'குடும்ப வன்முறை'],
  },
  {
    id: 'shakti-sadan',
    schemeName: 'Shakti Sadan (Shelter for Women in Difficult Circumstances)',
    officialName: 'Shakti Sadan Scheme - Mission Shakti',
    nameTa: 'சக்தி சதன் (பாதுகாப்பற்ற பெண்களுக்கான அரசு தங்குமிடம்)',
    description: 'Safe institutional shelter, food, clothing, medical aid, legal counsel, and vocational skill training for destitute women, widows, and victims of trafficking.',
    descriptionTa: 'ஆதரவற்ற பெண்கள், கைவிடப்பட்ட பெண்கள் மற்றும் குடும்ப பாதுகாப்பு இல்லாத சகோதரிகளுக்கான பாதுகாப்பான தங்குமிடம், உணவு மற்றும் மறுவாழ்வு பயிற்சி.',
    simpleDescription: 'Safe institutional shelter, food, healthcare, and rehabilitation for women in difficult circumstances without social support.',
    simpleDescriptionTa: 'ஆதரவற்ற மற்றும் பாதுகாப்பற்ற பெண்களுக்கு உணவு, தங்குமிடம் மற்றும் புதிய வாழ்க்கைக்கான தொழிற்பயிற்சி வழங்கும் திட்டம்.',
    category: 'shelter_distress',
    categoryLabel: 'Shelter & Rehabilitation for Women',
    whoItIsFor: 'Women in difficult circumstances: destitute women, deserted women, widows without support, victims of domestic violence or trafficking.',
    whoItIsForTa: 'பாதுகாப்பான தங்குமிடம் இல்லாத பெண்கள், ஆதரவற்ற தாய்மார்கள், மற்றும் குடும்ப வன்முறையால் வீட்டை விட்டு வெளியேறிய பெண்கள்.',
    importantEligibility: [
      'Women above 18 years in distress, deserted, or without familial support',
      'Children accompanying women (girls up to 18 years, boys up to 12 years)',
      'Free residential stay, food, clothing, and primary healthcare provided',
    ],
    importantEligibilityTa: [
      '18 வயதுக்கு மேற்பட்ட ஆதரவற்ற பெண்கள் மற்றும் அவர்களது குழந்தைகள்',
      'இலவச உணவு, பாதுகாப்பான தங்குமிடம் மற்றும் தொழிற்பயிற்சி',
    ],
    majorBenefit: 'Safe residential shelter, nutritious food, medical care, legal counseling, and economic empowerment through skill training.',
    majorBenefitTa: 'பாதுகாப்பான இருப்பிடம், சத்தான உணவு, மருத்துவ உதவி மற்றும் சுயசார்பு அடைவதற்கான தொழிற்பயிற்சி.',
    applicationMethod: 'Referred through One Stop Centre (Sakhi), Women Helpline 181, District Social Welfare Officer, or local Child Welfare Committee.',
    applicationMethodTa: '181 மகளிர் உதவி எண் அல்லது மாவட்ட சமூக நல அலுவலர் மூலமாக சேர்க்கை பெறலாம்.',
    officialWebsite: 'https://wcd.gov.in/women/shakti-sadan',
    officialDepartment: 'Ministry of Women and Child Development, Government of India',
    officialInfoUrl: 'https://wcd.gov.in/women/shakti-sadan',
    officialSourceUrl: 'https://wcd.gov.in/women/shakti-sadan',
    sourceUrl: 'https://wcd.gov.in/women/shakti-sadan',
    officialApplicationUrl: null,
    officialStatusUrl: null,
    applicationUrl: undefined,
    eligibilityUrl: 'https://wcd.gov.in/women/shakti-sadan',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['shelter', 'safe place to stay', 'safe place', 'destitute', 'destitute women', 'difficult circumstances', 'trafficked', 'abandoned', 'shakti sadan', 'தங்குமிடம்', 'பாதுகாப்பான இடம்', 'ஆதரவற்ற பெண்கள்'],
  },
  {
    id: 'mission-shakti',
    schemeName: 'Mission Shakti',
    officialName: 'Mission Shakti - Umbrella Scheme for Safety, Security and Empowerment of Women',
    nameTa: 'மிஷன் சக்தி (பெண்கள் பாதுகாப்பு மற்றும் அதிகாரமளித்தல் திட்டம்)',
    description: 'Integrated umbrella government initiative uniting Sambal (Safety & Security: OSC, 181, Beti Bachao) and Samarthya (Empowerment: PMMVY, Hostels, Palna).',
    descriptionTa: 'பெண்களின் பாதுகாப்பு, சட்ட உதவி, பேறுகால ஆதரவு மற்றும் பொருளாதார முன்னேற்றத்திற்கான மத்திய அரசின் ஒருங்கிணைந்த தேசிய திட்டம்.',
    simpleDescription: 'National umbrella mission for protection, safety, maternity care, and economic empowerment of women.',
    simpleDescriptionTa: 'பெண்கள் நலன், பாதுகாப்பு மற்றும் சுயசார்பிற்கான அரசின் முதன்மை இயக்கம்.',
    category: 'women_empowerment',
    categoryLabel: 'Women Safety & Empowerment Mission',
    whoItIsFor: 'All women and girls across India seeking safety, support, maternity benefits, or economic opportunities.',
    whoItIsForTa: 'பாதுகாப்பு, கல்வி, பேறுகால உதவி மற்றும் பொருளாதார வளர்ச்சி தேவைப்படும் அனைத்து இந்திய பெண்களும்.',
    importantEligibility: [
      'Comprehensive coverage across life-cycle: safety (Sambal) and empowerment (Samarthya)',
      'Universal access to helpline, shelter, and one-stop assistance',
      'Specific guidelines per sub-scheme (PMMVY, OSC, Sakhi Niwas, Hub for Empowerment)',
    ],
    importantEligibilityTa: [
      'பெண்களின் வாழ்க்கைச் சுழற்சி முழுவதும் பாதுகாப்பு மற்றும் வளர்ச்சி வாய்ப்புகள்',
    ],
    majorBenefit: 'Interlinked safety interventions, cash transfers, residential hostels, crèche facilities, and village-level gender awareness hubs.',
    majorBenefitTa: 'பாதுகாப்பு சேவைகள், நிதியுதவி திட்டங்கள் மற்றும் சுயசார்பு பயிற்சிகள்.',
    applicationMethod: 'Explore official Mission Shakti portal or access individual sub-schemes via myScheme and WCD portals.',
    applicationMethodTa: 'அதிகாரப்பூர்வ wcd.gov.in/women/mission-shakti தளம் அல்லது myScheme வழியாக பார்க்கலாம்.',
    officialWebsite: 'https://wcd.gov.in/women/mission-shakti',
    officialDepartment: 'Ministry of Women and Child Development, Government of India',
    officialInfoUrl: 'https://wcd.gov.in/women/mission-shakti',
    officialSourceUrl: 'https://wcd.gov.in/women/mission-shakti',
    sourceUrl: 'https://wcd.gov.in/women/mission-shakti',
    officialApplicationUrl: null,
    officialStatusUrl: null,
    applicationUrl: undefined,
    eligibilityUrl: 'https://wcd.gov.in/women/mission-shakti',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['mission shakti', 'women empowerment', 'women safety', 'women schemes', 'women support', 'sambal', 'samarthya', 'மகளிர் சக்தி', 'அதிகாரமளித்தல்'],
  },
  {
    id: 'nsp',
    schemeName: 'National Scholarship Portal',
    officialName: 'National Scholarship Portal (NSP) - Government of India',
    nameTa: 'தேசிய கல்வி உதவித்தொகை இணையதளம் (NSP)',
    description: 'Central portal hosting pre-matric, post-matric, higher education, and technical scholarships for students and girl children across India.',
    descriptionTa: 'பள்ளி மற்றும் கல்லூரி மாணவ, மாணவிகளுக்கான மத்திய மற்றும் மாநில அரசு கல்வி உதவித்தொகை (ஸ்காலர்ஷிப்) வழங்கும் அதிகாரப்பூர்வ இணையதளம்.',
    simpleDescription: 'Official electronic platform providing Central & State student scholarship schemes, eligibility checker, and online application portal.',
    simpleDescriptionTa: 'பள்ளி மற்றும் கல்லூரி மாணவ, மாணவிகளுக்கான மத்திய மற்றும் மாநில அரசு கல்வி உதவித்தொகை (ஸ்காலர்ஷிப்) வழங்கும் அதிகாரப்பூர்வ இணையதளம்.',
    category: 'education_skills',
    categoryLabel: 'Student Scholarships & Education',
    whoItIsFor: 'Students pursuing school, college, diploma, or university education seeking government scholarships and fee support.',
    whoItIsForTa: 'பள்ளி மற்றும் கல்லூரிகளில் பயிலும் தகுதியுள்ள மாணவ, மாணவிகள்.',
    importantEligibility: [
      'Enrolled in recognized school, college, or university',
      'Eligibility criteria vary by scheme (Pre-Matric, Post-Matric, Merit-cum-Means)',
      'Government verified portal confirms final eligibility and One-Time Registration (OTR)',
    ],
    importantEligibilityTa: [
      'அங்கீகரிக்கப்பட்ட பள்ளி அல்லது கல்லூரியில் பயில வேண்டும்',
      'அரசு உதவித்தொகை விதிகளின்படி தகுதி பெற வேண்டும்',
    ],
    majorBenefit: 'Direct financial assistance / stipend for tuition fees and maintenance credited straight into student bank accounts.',
    majorBenefitTa: 'கல்விக் கட்டணம் மற்றும் உதவித்தொகை வங்கி கணக்கில் நேரடியாக செலுத்தப்படுகிறது.',
    applicationMethod: 'Register online with One-Time Registration (OTR) on the official scholarships.gov.in portal.',
    applicationMethodTa: 'அதிகாரப்பூர்வ scholarships.gov.in தளத்தில் OTR பதிவு செய்து ஆன்லைனில் விண்ணப்பிக்கலாம்.',
    officialWebsite: 'https://scholarships.gov.in/',
    officialDepartment: 'Ministry of Electronics and Information Technology & Ministry of Education, Government of India',
    officialInfoUrl: 'https://scholarships.gov.in/',
    officialSourceUrl: 'https://scholarships.gov.in/',
    sourceUrl: 'https://scholarships.gov.in/',
    officialApplicationUrl: 'https://scholarships.gov.in/',
    officialStatusUrl: 'https://scholarships.gov.in/',
    applicationUrl: 'https://scholarships.gov.in/',
    eligibilityUrl: 'https://scholarships.gov.in/',
    statusUrl: 'https://scholarships.gov.in/',
    grievanceUrl: 'https://scholarships.gov.in/',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['scholarship', 'student scholarship', 'student', 'education', 'daughter scholarship', 'fees', 'college', 'school', 'nsp', 'உதவித்தொகை', 'ஸ்காலர்ஷிப்', 'கல்வி', 'மாணவி'],
  },
  {
    id: 'myscheme',
    schemeName: 'myScheme',
    officialName: 'myScheme — National Government Schemes Discovery Platform',
    nameTa: 'அரசு திட்டங்கள் தேசிய இணையதளம் (myScheme)',
    description: 'National single-window scheme discovery platform enabling citizens to find relevant Central and State schemes using simple eligibility filters.',
    descriptionTa: 'இந்திய அரசின் 700+ திட்டங்களை ஒரே இடத்தில் கண்டறிந்து தகுதி விவரங்களை அறியும் அதிகாரப்பூர்வ தளம்.',
    simpleDescription: 'Official national scheme discovery platform to find relevant schemes, check eligibility criteria, and navigate to verified application portals.',
    simpleDescriptionTa: 'அனைத்து அரசு திட்டங்களையும் ஒரே இடத்தில் கண்டறியும் அதிகாரப்பூர்வ தேசிய தளம்.',
    category: 'general_schemes',
    categoryLabel: 'Official Government Scheme Finder',
    whoItIsFor: 'Any citizen, woman, or family seeking to find which government schemes they are eligible for.',
    whoItIsForTa: 'அரசு திட்டங்கள் தேவைப்படும் அனைத்து பெண்களும் குடும்பங்களும்.',
    importantEligibility: [
      'Open to all Indian citizens',
      'Provides filter by gender, age, caste, state, residence, and income',
    ],
    importantEligibilityTa: [
      'அனைத்து குடிமக்களும் இலவசமாக திட்டங்களை தேடலாம்',
    ],
    majorBenefit: 'Find 700+ Central and State government schemes in one search with step-by-step guidance and official application links.',
    majorBenefitTa: 'அனைத்து அரசு திட்டங்களையும் ஒரே இடத்தில் கண்டறிந்து விண்ணப்பிக்கலாம்.',
    applicationMethod: 'Visit myscheme.gov.in online, answer basic screening questions, and explore matched schemes.',
    applicationMethodTa: 'myscheme.gov.in இணையதளத்தில் உங்கள் தகவல்களை கொடுத்து திட்டங்களை கண்டறியலாம்.',
    officialWebsite: 'https://www.myscheme.gov.in/',
    officialDepartment: 'Ministry of Electronics and Information Technology (MeitY), Government of India',
    officialInfoUrl: 'https://www.myscheme.gov.in/',
    officialSourceUrl: 'https://www.myscheme.gov.in/',
    sourceUrl: 'https://www.myscheme.gov.in/',
    officialApplicationUrl: 'https://www.myscheme.gov.in/find-scheme',
    officialStatusUrl: null,
    applicationUrl: 'https://www.myscheme.gov.in/find-scheme',
    eligibilityUrl: 'https://www.myscheme.gov.in/ta',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['myscheme', 'schemes for women', 'women schemes', 'general government schemes', 'find schemes', 'schemes for me', 'திட்டங்கள்', 'அரசு திட்டங்கள்', 'கண்டறி'],
  },
  {
    id: 'ssy',
    schemeName: 'Sukanya Samriddhi Yojana (SSY)',
    officialName: 'Sukanya Samriddhi Yojana (SSY)',
    nameTa: 'செல்வ மகள் சேமிப்புத் திட்டம் (சுகன்யா சம்ரிதி)',
    description: 'Government-backed high-interest savings scheme dedicated to girl children up to age 10 for higher education and marriage security.',
    descriptionTa: 'பெண் குழந்தைகளின் உயர்கல்வி மற்றும் எதிர்காலத்திற்காக தபால் நிலையம் மற்றும் வங்கிகளில் அதிக வட்டி தரும் அரசு சேமிப்புத் திட்டம்.',
    simpleDescription: 'Government-backed high-interest savings scheme dedicated to girl children for higher education and marriage security.',
    simpleDescriptionTa: 'பெண் குழந்தைகளின் உயர்கல்வி மற்றும் எதிர்காலத்திற்காக தபால் நிலையம் மற்றும் வங்கிகளில் அதிக வட்டி தரும் அரசு சேமிப்புத் திட்டம்.',
    category: 'education_skills',
    categoryLabel: 'Girl Child Welfare & Savings',
    whoItIsFor: 'Parents or legal guardians of girl children from birth up to 10 years of age (maximum 2 girl children per family).',
    whoItIsForTa: 'பிறந்தது முதல் 10 வயதுக்குட்பட்ட பெண் குழந்தைகளை கொண்ட பெற்றோர்கள்.',
    importantEligibility: [
      'Account can be opened in the name of girl child before she attains 10 years of age',
      'Only one account per girl child, and maximum two girl children per family',
      'Minimum deposit of ₹250 per financial year, maximum deposit up to ₹1.5 Lakh per year',
      'Account matures after 21 years from opening date; partial withdrawal up to 50% allowed for higher education after age 18',
    ],
    importantEligibilityTa: [
      'பெண் குழந்தையின் 10 வயதுக்குள் கணக்கு தொடங்க வேண்டும்',
      'ஒரு குடும்பத்தில் அதிகபட்சம் 2 பெண் குழந்தைகளுக்கு தொடங்கலாம்',
      'ஆண்டுக்கு குறைந்தபட்சம் ₹250 மட்டும் செலுத்தினால் போதும்',
    ],
    majorBenefit: 'High sovereign interest rate (currently 8.2% p.a.), exempt under Section 80C, and fully tax-free interest and maturity amount.',
    majorBenefitTa: 'அரசின் அதிகபட்ச சேமிப்பு வட்டி (8.2%), வருமான வரி விலக்கு மற்றும் எதிர்கால உயர்கல்விக்கான உறுதியான நிதி.',
    applicationMethod: 'Open an account at any Post Office branch or authorized public/private commercial bank branch with birth certificate.',
    applicationMethodTa: 'அருகிலுள்ள தபால் நிலையம் (Post Office) அல்லது வங்கியில் குழந்தையின் பிறப்புச் சான்றிதழுடன் எளிதாக கணக்கு தொடங்கலாம்.',
    officialWebsite: 'https://www.indiapost.gov.in',
    officialDepartment: 'Department of Posts / Department of Economic Affairs, Ministry of Finance, Government of India',
    officialInfoUrl: 'https://www.indiapost.gov.in',
    officialSourceUrl: 'https://www.indiapost.gov.in',
    sourceUrl: 'https://www.myscheme.gov.in/schemes/ssy',
    officialApplicationUrl: null,
    officialStatusUrl: null,
    applicationUrl: undefined,
    eligibilityUrl: 'https://www.myscheme.gov.in/schemes/ssy',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['girl child', 'daughter', 'savings', 'sukanya', 'ssy', 'child welfare', 'future', 'post office', 'பெண் குழந்தை', 'சேமிப்பு', 'மகள்'],
  },
  {
    id: 'lakhpati-didi',
    schemeName: 'Deendayal Antyodaya Yojana - DAY-NRLM (Lakhpati Didi / SHG)',
    officialName: 'Deendayal Antyodaya Yojana - DAY-NRLM (Lakhpati Didi / SHG)',
    nameTa: 'லிக்பதி திதி - மகளிர் வாழ்வாதார சுயஉதவி குழு இயக்கம்',
    description: 'Skill training, livelihood support, micro-enterprise planning, and low-interest credit for rural women in Self-Help Groups.',
    descriptionTa: 'சுயஉதவி குழு பெண்களுக்கான திறன் பயிற்சி, தொழில் வழிகாட்டல் மற்றும் ஆண்டுக்கு ₹1 லட்சத்திற்கும் மேல் வருமானம் ஈட்ட கடன் உதவி.',
    simpleDescription: 'Skill training, livelihood support, micro-enterprise planning, and low-interest credit for rural women in Self-Help Groups.',
    simpleDescriptionTa: 'சுயஉதவி குழு பெண்களுக்கான திறன் பயிற்சி, தொழில் வழிகாட்டல் மற்றும் ஆண்டுக்கு ₹1 லட்சத்திற்கும் மேல் வருமானம் ஈட்ட கடன் உதவி.',
    category: 'livelihood_work',
    categoryLabel: "Women's Livelihood & Employment",
    whoItIsFor: 'Rural women seeking livelihood, tailoring, livestock, agriculture, or micro-business who are members of Women Self-Help Groups (SHGs).',
    whoItIsForTa: 'கிராமப்புற பெண்கள் மற்றும் சுயஉதவி குழுக்களில் உள்ள சகோதரிகள் தொழில் செய்து வருமானம் ஈட்ட.',
    importantEligibility: [
      'Member of a registered Women Self-Help Group (SHG) under State Rural Livelihoods Mission',
      'Willingness to take up livelihood/enterprise activities (dairy, tailoring, poultry, digital services, local retail)',
      'Priority to vulnerable, landless, and rural households',
    ],
    importantEligibilityTa: [
      'அரசு அங்கீகாரம் பெற்ற மகளிர் சுயஉதவி குழுவில் (SHG) உறுப்பினராக இருக்க வேண்டும்',
      'சொந்தமாக தொழில் அல்லது வேலை செய்ய ஆர்வம் இருக்க வேண்டும்',
    ],
    majorBenefit: 'Training in marketable skills, community investment fund, revolving fund, bank linkage loans at subsidized interest rate, and market access.',
    majorBenefitTa: 'இலவச தொழிற்பயிற்சி, குறைந்த வட்டியில் வங்கி கடன் மற்றும் தயாரிப்புகளை விற்க சந்தை வாய்ப்புகள்.',
    applicationMethod: 'Apply through your Village Organization / Gram Panchayat SHG leader or the Block Development Officer (NRLM).',
    applicationMethodTa: 'உங்கள் ஊர் மகளிர் சுயஉதவி குழு (SHG) அல்லது ஊராட்சி அளவிலான கூட்டமைப்பு மூலமாக விண்ணப்பிக்கலாம்.',
    officialWebsite: 'https://nrlm.gov.in',
    officialDepartment: 'Ministry of Rural Development, Government of India',
    officialInfoUrl: 'https://lakhpatididi.gov.in',
    officialSourceUrl: 'https://lakhpatididi.gov.in',
    sourceUrl: 'https://lakhpatididi.gov.in',
    officialApplicationUrl: null,
    officialStatusUrl: null,
    applicationUrl: undefined,
    eligibilityUrl: 'https://nrlm.gov.in',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['work', 'livelihood', 'job', 'shg', 'training', 'skills', 'lakhpati didi', 'rural', 'income', 'வேலை', 'சுயஉதவி குழு', 'வருமானம்'],
  },
  {
    id: 'pm-mudra',
    schemeName: 'Pradhan Mantri Mudra Yojana (PMMY) for Women Entrepreneurs',
    officialName: 'Pradhan Mantri Mudra Yojana (PMMY) for Women Entrepreneurs',
    nameTa: 'பிரதான் மந்திரி முத்ரா கடன் திட்டம் (பெண்கள் தொழில் கடன்)',
    description: 'Collateral-free business loans up to ₹10 Lakh for women starting or expanding micro-enterprises and shops.',
    descriptionTa: 'சொத்து அடமானம் எதுவும் இல்லாமல் பெண்கள் சொந்தமாக சிறுதொழில் தொடங்க ₹50,000 முதல் ₹10 லட்சம் வரை அரசு வங்கி கடன்.',
    simpleDescription: 'Collateral-free business loans up to ₹10 Lakh for women starting or expanding small businesses, shops, and cottage units.',
    simpleDescriptionTa: 'சொத்து அடமானம் எதுவும் இல்லாமல் பெண்கள் சொந்தமாக சிறுதொழில் தொடங்க ₹50,000 முதல் ₹10 லட்சம் வரை அரசு வங்கி கடன்.',
    category: 'business_entrepreneurship',
    categoryLabel: "Women's Entrepreneurship & Business",
    whoItIsFor: 'Women who want to start or run small enterprises: tailoring, beauty parlors, grocery shops, food stalls, handicrafts.',
    whoItIsForTa: 'தையல் கடை, மளிகை கடை, அழகு நிலையம், உணவு தயாரிப்பு போன்ற சிறு தொழில் தொடங்க விரும்பும் பெண்கள்.',
    importantEligibility: [
      'Indian citizen woman aged 18 or above',
      'Viable business proposal or running micro-enterprise in non-farm sector',
      'No past loan default in commercial or cooperative banks',
      'Three loan tiers: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakh), Tarun (₹5 Lakh to ₹10 Lakh)',
    ],
    importantEligibilityTa: [
      'வயது 18 பூர்த்தியாகியிருக்க வேண்டும்',
      'சொந்த தொழில் தொடங்குவதற்கான திட்ட குறிப்பு இருக்க வேண்டும்',
      'வங்கி கடனில் தவறாத வரலாறு இருக்க வேண்டும்',
    ],
    majorBenefit: 'No collateral required, reasonable interest rates with concession for women borrowers, flexible repayment tenure up to 5 years.',
    majorBenefitTa: 'எந்தவித சொத்து அடமானமும் இன்றி கடன் பெறலாம், பெண்களுக்கு வட்டி சலுகை உண்டு.',
    applicationMethod: 'Apply at any commercial bank branch, RRB, cooperative bank, or submit an application online via udyamimitra.in.',
    applicationMethodTa: 'அருகிலுள்ள எந்த அரசு அல்லது வணிக வங்கியிலும் விண்ணப்பிக்கலாம் அல்லது udyamimitra.in தளத்தில் விண்ணப்பிக்கலாம்.',
    officialWebsite: 'https://www.mudra.org.in',
    officialDepartment: 'Department of Financial Services, Ministry of Finance, Government of India',
    officialInfoUrl: 'https://www.mudra.org.in',
    officialSourceUrl: 'https://www.mudra.org.in',
    sourceUrl: 'https://www.myscheme.gov.in/schemes/pmmy',
    officialApplicationUrl: 'https://www.udyamimitra.in',
    officialStatusUrl: 'https://www.udyamimitra.in',
    applicationUrl: 'https://www.udyamimitra.in',
    eligibilityUrl: 'https://www.myscheme.gov.in/schemes/pmmy',
    statusUrl: 'https://www.udyamimitra.in',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['business', 'loan', 'entrepreneur', 'shop', 'tailoring', 'mudra', 'start business', 'self employment', 'தொழில்', 'கடன்', 'வியாபாரம்'],
  },
  {
    id: 'pudhumaipenn',
    schemeName: 'Pudhumai Penn Thittam (Moovalur Ramamirtham Ammaiyar Scheme)',
    officialName: 'Pudhumai Penn Thittam (Moovalur Ramamirtham Ammaiyar Scheme)',
    nameTa: 'புதுமைப் பெண் திட்டம் (உயர்கல்வி உறுதித் திட்டம் - தமிழ்நாடு)',
    description: 'Monthly stipend of ₹1,000 directly into bank accounts of girl students who studied in government schools and are pursuing higher education.',
    descriptionTa: 'அரசு பள்ளிகளில் படித்து கல்லூரி, பாலிடெக்னிக் அல்லது தொழிற்கல்வி பயிலும் மாணவிகளுக்கு மாதம் ₹1,000 வழங்கும் திட்டம்.',
    simpleDescription: 'Monthly stipend of ₹1,000 directly into the bank accounts of girl students pursuing college degrees/diplomas.',
    simpleDescriptionTa: 'அரசு பள்ளிகளில் படித்து கல்லூரி, பாலிடெக்னிக் அல்லது தொழிற்கல்வி பயிலும் மாணவிகளுக்கு மாதம் ₹1,000 வழங்கும் திட்டம்.',
    category: 'education_skills',
    categoryLabel: 'Girl Child & Education',
    whoItIsFor: 'Girl students residing in Tamil Nadu pursuing undergraduate degree, diploma, ITI, or professional course in recognized institutions.',
    whoItIsForTa: 'தமிழ்நாட்டில் அரசு பள்ளியில் படித்து தற்போது கல்லூரி படிக்கும் மாணவிகள்.',
    importantEligibility: [
      'Must have studied continuously in Tamil Nadu Government schools from 6th to 12th standard',
      'Currently enrolled in a recognized undergraduate degree (BA, BSc, BCom, BE), diploma, ITI, or professional college course',
      'Benefit of ₹1,000 paid monthly until completion of the course duration',
    ],
    importantEligibilityTa: [
      '6 முதல் 12-ஆம் வகுப்பு வரை அரசு பள்ளியில் படித்திருக்க வேண்டும்',
      'கல்லூரி அல்லது பட்டயப் படிப்பில் சேர்ந்திருக்க வேண்டும்',
    ],
    majorBenefit: '₹1,000 transferred directly every month into student bank account throughout degree duration.',
    majorBenefitTa: 'படிப்பு முடியும் வரை மாணவிகளின் வங்கி கணக்கில் மாதம் தோறும் ₹1,000 நேரடியாக செலுத்தப்படுகிறது.',
    applicationMethod: 'Apply through your college nodal officer or administration via the official pudhumaipenn.tn.gov.in portal.',
    applicationMethodTa: 'மாணவிகள் படிக்கும் கல்லூரி நிர்வாகம் மற்றும் pudhumaipenn.tn.gov.in தளம் வழியாக விண்ணப்பிக்கலாம்.',
    officialWebsite: 'https://pudhumaipenn.tn.gov.in',
    officialDepartment: 'Social Welfare & Women Empowerment Department, Government of Tamil Nadu',
    officialInfoUrl: 'https://pudhumaipenn.tn.gov.in',
    officialSourceUrl: 'https://pudhumaipenn.tn.gov.in',
    sourceUrl: 'https://www.myscheme.gov.in/schemes/pudhumaipenn',
    officialApplicationUrl: 'https://pudhumaipenn.tn.gov.in',
    officialStatusUrl: 'https://pudhumaipenn.tn.gov.in',
    applicationUrl: 'https://pudhumaipenn.tn.gov.in',
    eligibilityUrl: 'https://www.myscheme.gov.in/schemes/pudhumaipenn',
    statusUrl: 'https://pudhumaipenn.tn.gov.in',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['student', 'college', 'degree', 'education', 'girls', 'higher education', 'pudhumai penn', 'மாணவி', 'கல்லூரி', 'படிப்பு', 'கல்வி'],
  },
  {
    id: 'kmut',
    schemeName: 'Kalaignar Magalir Urimai Thogai Thittam (KMUT - Tamil Nadu)',
    officialName: 'Kalaignar Magalir Urimai Thogai Thittam (KMUT - Tamil Nadu)',
    nameTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம் (மாதம் ₹1,000 - தமிழ்நாடு)',
    description: 'Monthly basic income support of ₹1,000 for women heads of eligible households in Tamil Nadu.',
    descriptionTa: 'குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 வழங்கும் சமூக பாதுகாப்பு மற்றும் பொருளாதார உரிமைத் திட்டம்.',
    simpleDescription: 'Monthly basic income support of ₹1,000 for women heads of eligible households to recognize women unpaid domestic labor.',
    simpleDescriptionTa: 'குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 வழங்கும் சமூக பாதுகாப்பு மற்றும் பொருளாதார உரிமைத் திட்டம்.',
    category: 'financial_social',
    categoryLabel: 'Social & Financial Support',
    whoItIsFor: 'Eligible adult women heads of households in Tamil Nadu meeting basic socioeconomic criteria.',
    whoItIsForTa: 'தமிழ்நாட்டில் வசிக்கும் தகுதியுள்ள குடும்பத் தலைவிகள்.',
    importantEligibility: [
      'Woman head of household aged 21 years or above',
      'Resident of Tamil Nadu with valid Smart Ration Card (family card)',
      'Annual family income below ₹2.5 Lakh',
      'Annual domestic electricity consumption below 3,600 units',
      'Owns less than 5 acres of wetland or less than 10 acres of dry land',
    ],
    importantEligibilityTa: [
      'வயது 21 பூர்த்தியாகியிருக்க வேண்டும்',
      'குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குள் இருக்க வேண்டும்',
      'ஆண்டு மின் பயன்பாடு 3,600 யூனிட்டுக்கு குறைவாக இருக்க வேண்டும்',
    ],
    majorBenefit: '₹1,000 credited on the 15th of every month directly to beneficiary bank account via DBT.',
    majorBenefitTa: 'ஒவ்வொரு மாதமும் ₹1,000 உங்கள் வங்கிக் கணக்கில் நேரடியாக வரவு வைக்கப்படுகிறது.',
    applicationMethod: 'Apply through designated e-Sevai centers, special camps, or appeal through local Taluk Office / Revenue Division.',
    applicationMethodTa: 'அரசு இ-சேவை மையங்கள் அல்லது சிறப்பு முகாம்கள் மூலமாக விண்ணப்பிக்கலாம்.',
    officialWebsite: 'https://kmut.tn.gov.in',
    officialDepartment: 'Special Programme Implementation Department, Government of Tamil Nadu',
    officialInfoUrl: 'https://kmut.tn.gov.in',
    officialSourceUrl: 'https://kmut.tn.gov.in',
    sourceUrl: 'https://www.tnesevai.tn.gov.in',
    officialApplicationUrl: 'https://www.tnesevai.tn.gov.in',
    officialStatusUrl: 'https://kmut.tn.gov.in',
    applicationUrl: 'https://www.tnesevai.tn.gov.in',
    eligibilityUrl: 'https://kmut.tn.gov.in',
    statusUrl: 'https://kmut.tn.gov.in',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['monthly', 'urimai', 'housewife', 'mother', 'family', 'financial support', 'kmut', 'மாதம் 1000', 'குடும்பத் தலைவி', 'உரிமைத் தொகை'],
  },
  {
    id: 'sakhi-niwas',
    schemeName: 'Working Women Hostel (Sakhi Niwas)',
    officialName: 'Working Women Hostel (Sakhi Niwas) Scheme - Mission Shakti',
    nameTa: 'பணிபுரியும் மகளிர் விடுதி (சகி நிவாஸ்)',
    description: 'Safe, affordable accommodation with daycare/crèche facilities for children of working women in urban, semi-urban, and rural areas.',
    descriptionTa: 'வேலைக்கு செல்லும் பெண்களுக்கு பாதுகாப்பான, குறைந்த கட்டண தங்குமிடம் மற்றும் குழந்தைகளுக்கான காப்பக வசதி வழங்கும் திட்டம்.',
    simpleDescription: 'Safe, affordable hostel accommodation and childcare facility for employed women.',
    simpleDescriptionTa: 'பணிபுரியும் பெண்களுக்கான பாதுகாப்பான அரசு தங்குமிடம் மற்றும் குழந்தை காப்பகம்.',
    category: 'working_women_hostel',
    categoryLabel: 'Working Women & Hostel Support',
    whoItIsFor: 'Employed, self-employed, or job-training women residing away from family, including single, widowed, divorced, or separated women.',
    whoItIsForTa: 'சொந்த ஊரை விட்டு வெளியே தங்கி வேலை செய்யும் அல்லது பயிற்சி பெறும் பெண்கள்.',
    importantEligibility: [
      'Working woman or woman undergoing job training',
      'Gross income should not exceed specified state limits',
      'Daycare / crèche facilities available for children (girls up to 18 years, boys up to 5 years)',
    ],
    importantEligibilityTa: [
      'பணிபுரியும் அல்லது தொழிற்பயிற்சி பெறும் பெண்',
      'குழந்தைகளுக்கான காப்பக வசதி உண்டு',
    ],
    majorBenefit: 'Safe, subsidized, guarded residential hostel accommodation with dining and childcare facilities.',
    majorBenefitTa: 'பாதுகாப்பான விடுதி அறை, உணவு மற்றும் குழந்தை பராமரிப்பு வசதி.',
    applicationMethod: 'Apply directly to the local Managing Committee / Implementing Agency of the district Sakhi Niwas / Working Women Hostel.',
    applicationMethodTa: 'மாவட்ட பணிபுரியும் மகளிர் விடுதி நிர்வாகத்திடம் நேரடியாக விண்ணப்பிக்கலாம்.',
    officialWebsite: 'https://wcd.gov.in/women/working-women-hostel',
    officialDepartment: 'Ministry of Women and Child Development, Government of India',
    officialInfoUrl: 'https://wcd.gov.in/women/working-women-hostel',
    officialSourceUrl: 'https://wcd.gov.in/women/working-women-hostel',
    sourceUrl: 'https://wcd.gov.in/women/working-women-hostel',
    officialApplicationUrl: null,
    officialStatusUrl: null,
    applicationUrl: undefined,
    eligibilityUrl: 'https://wcd.gov.in/women/working-women-hostel',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['working women', 'hostel', 'sakhi niwas', 'childcare', 'creche', 'working mothers', 'accommodation', 'விடுதி', 'பணிபுரியும் பெண்கள்', 'தங்குமிடம்'],
  },
  {
    id: 'standup-india',
    schemeName: 'Stand-Up India Scheme for Women Entrepreneurs',
    officialName: 'Stand-Up India Scheme for Women Entrepreneurs',
    nameTa: 'ஸ்டாண்ட்-அப் இந்தியா (மகளிர் தொழில் தொடங்குதல்)',
    description: 'Bank loan from ₹10 Lakh to ₹1 Crore for women establishing greenfield ventures in manufacturing, services, or trading.',
    descriptionTa: 'பெண்கள் புதிய உற்பத்தி, சேவை அல்லது வர்த்தக தொழில் தொடங்க ₹10 லட்சம் முதல் ₹1 கோடி வரை வங்கி கடன் வழங்கும் திட்டம்.',
    simpleDescription: 'Bank loan from ₹10 Lakh to ₹1 Crore for women establishing greenfield ventures in manufacturing, services, or trading.',
    simpleDescriptionTa: 'பெண்கள் புதிய உற்பத்தி, சேவை அல்லது வர்த்தக தொழில் தொடங்க ₹10 லட்சம் முதல் ₹1 கோடி வரை வங்கி கடன் வழங்கும் திட்டம்.',
    category: 'business_entrepreneurship',
    categoryLabel: "Women's Entrepreneurship & Business",
    whoItIsFor: 'Women entrepreneurs (18+) setting up a greenfield (first-time) manufacturing, service, agri-allied, or trading enterprise.',
    whoItIsForTa: 'புதிய நிறுவனங்கள் அல்லது தொழிற்சாலை தொடங்க விரும்பும் பெண் தொழில்முனைவோர்.',
    importantEligibility: [
      'Applicant must be a woman aged 18 or above',
      'Loan is only for first-time greenfield enterprise in manufacturing, services, agri-allied, or trading sector',
      'In non-individual enterprises, 51% of shareholding and controlling stake must be held by the woman',
      'Borrower should not be in default to any bank or financial institution',
    ],
    importantEligibilityTa: [
      '18 வயதுக்கு மேற்பட்ட பெண் தொழில்முனைவோர்',
      'புதிய தொழில் திட்டமாக (Greenfield) இருக்க வேண்டும்',
    ],
    majorBenefit: 'Composite loan between ₹10 Lakh and ₹1 Crore covering 85% of project cost, repayable in up to 7 years with a moratorium up to 18 months.',
    majorBenefitTa: '₹10 லட்சம் முதல் ₹1 கோடி வரை திட்ட மதிப்பீட்டில் 85% கடன், 7 ஆண்டுகள் வரை திருப்பிச் செலுத்தும் அவகாசம்.',
    applicationMethod: 'Apply online on standupmitra.in portal or directly at any Scheduled Commercial Bank branch.',
    applicationMethodTa: 'standupmitra.in இணையதளம் மூலமாக அல்லது எந்த அரசு வணிக வங்கியிலும் விண்ணப்பிக்கலாம்.',
    officialWebsite: 'https://www.standupmitra.in',
    officialDepartment: 'Department of Financial Services, Ministry of Finance, Government of India',
    officialInfoUrl: 'https://www.standupmitra.in',
    officialSourceUrl: 'https://www.standupmitra.in',
    sourceUrl: 'https://www.myscheme.gov.in/schemes/standup-india',
    officialApplicationUrl: 'https://www.standupmitra.in',
    officialStatusUrl: 'https://www.standupmitra.in',
    applicationUrl: 'https://www.standupmitra.in',
    eligibilityUrl: 'https://www.myscheme.gov.in/schemes/standup-india',
    statusUrl: 'https://www.standupmitra.in',
    grievanceUrl: 'https://pgportal.gov.in',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['business', 'enterprise', 'large loan', 'standup', 'greenfield', 'factory', 'தொழில்முனைவோர்', 'நிறுவனம்', 'பெரிய கடன்'],
  },
  {
    id: 'pm-ujjwala',
    schemeName: 'Pradhan Mantri Ujjwala Yojana (PMUY 2.0)',
    officialName: 'Pradhan Mantri Ujjwala Yojana (PMUY 2.0)',
    nameTa: 'பிரதமர் உஜ்வாலா திட்டம் (இலவச எரிவாயு இணைப்பு)',
    description: 'Deposit-free LPG cooking gas connection, free first cylinder and stove, plus targeted cooking fuel subsidy for eligible women.',
    descriptionTa: 'வறுமைக் கோட்டிற்கு கீழ் உள்ள பெண்களுக்கு வைப்புத் தொகை இல்லாத இலவச கேஸ் இணைப்பு, முதல் சிலிண்டர் மற்றும் அடுப்பு வழங்கும் திட்டம்.',
    simpleDescription: 'Deposit-free LPG cooking gas connection, free first cylinder and stove, plus targeted cooking fuel subsidy for eligible women.',
    simpleDescriptionTa: 'வறுமைக் கோட்டிற்கு கீழ் உள்ள பெண்களுக்கு வைப்புத் தொகை இல்லாத இலவச கேஸ் இணைப்பு, முதல் சிலிண்டர் மற்றும் அடுப்பு வழங்கும் திட்டம்.',
    category: 'financial_social',
    categoryLabel: 'Social & Financial Support',
    whoItIsFor: 'Adult women belonging to poor / BPL / priority households that do not currently have any LPG connection in the home.',
    whoItIsForTa: 'வீட்டில் கேஸ் இணைப்பு இல்லாத ஏழை மற்றும் எளிய குடும்பங்களைச் சேர்ந்த பெண்கள்.',
    importantEligibility: [
      'Applicant must be a woman aged 18 years or above',
      'There must be no other LPG connection in the same household/ration card',
      'Must belong to eligible category: SC/ST, PMAY beneficiary, Antyodaya Anna Yojana (AAY), or poor household declaration',
    ],
    importantEligibilityTa: [
      'விண்ணப்பதாரர் 18 வயது நிரம்பிய பெண்ணாக இருக்க வேண்டும்',
      'குடும்ப அட்டைக்கு ஏற்கனவே கேஸ் இணைப்பு இருக்கக்கூடாது',
    ],
    majorBenefit: 'Free LPG connection with zero security deposit, free gas stove and first refill cylinder, ongoing direct benefit transfer subsidy.',
    majorBenefitTa: 'இலவச சிலிண்டர் இணைப்பு, இலவச அடுப்பு மற்றும் ரீஃபில் சிலிண்டருக்கு அரசு மானியம்.',
    applicationMethod: 'Apply online on pmuy.gov.in or submit an application directly to nearest LPG distributor (Indane, Bharat Gas, HP Gas).',
    applicationMethodTa: 'pmuy.gov.in தளத்தில் விண்ணப்பிக்கலாம் அல்லது அருகிலுள்ள கேஸ் ஏஜென்சியில் (Indane, Bharat, HP) விண்ணப்பிக்கலாம்.',
    officialWebsite: 'https://www.pmuy.gov.in',
    officialDepartment: 'Ministry of Petroleum and Natural Gas, Government of India',
    officialInfoUrl: 'https://www.pmuy.gov.in',
    officialSourceUrl: 'https://www.pmuy.gov.in',
    sourceUrl: 'https://www.myscheme.gov.in/schemes/pmuy',
    officialApplicationUrl: 'https://www.pmuy.gov.in',
    officialStatusUrl: 'https://www.pmuy.gov.in',
    applicationUrl: 'https://www.pmuy.gov.in',
    eligibilityUrl: 'https://www.myscheme.gov.in/schemes/pmuy',
    statusUrl: 'https://www.pmuy.gov.in',
    lastVerified: '2026-10-01',
    lastVerifiedDate: 'October 2026',
    keywords: ['gas', 'cylinder', 'cooking', 'fuel', 'lpg', 'stove', 'ujjwala', 'கேஸ்', 'எரிவாயு', 'சிலிண்டர்', 'அடுப்பு'],
  },
];

export const MYSCHEME_PORTAL_CARD: SchemeCardData = {
  schemeId: 'myscheme',
  schemeName: 'myScheme',
  nameTa: 'அரசு திட்டங்கள் தேசிய இணையதளம் (myScheme)',
  categoryLabel: 'Official Government Scheme Finder',
  whatItIs: 'Official national scheme discovery platform to find relevant schemes, check eligibility criteria, and navigate to verified application portals.',
  whatItIsTa: 'இந்திய அரசின் 700+ திட்டங்களை ஒரே இடத்தில் கண்டறிந்து தகுதி விவரங்களை அறியும் அதிகாரப்பூர்வ தளம்.',
  officialDepartment: 'Ministry of Electronics and Information Technology (MeitY), Government of India',
  officialInfoUrl: 'https://www.myscheme.gov.in/',
  officialSourceUrl: 'https://www.myscheme.gov.in/',
  applicationUrl: 'https://www.myscheme.gov.in/find-scheme',
  eligibilityUrl: 'https://www.myscheme.gov.in/ta',
  lastVerified: '2026-10-01',
  actions: [
    { label: 'Open Official myScheme', url: 'https://www.myscheme.gov.in/ta', type: 'official' },
    { label: 'Check Official Eligibility', url: 'https://www.myscheme.gov.in/ta', type: 'eligibility' },
    { label: 'Apply on Official Website', url: 'https://www.myscheme.gov.in/find-scheme', type: 'apply' },
  ],
};

export const NSP_PORTAL_CARD: SchemeCardData = {
  schemeId: 'nsp',
  schemeName: 'National Scholarship Portal (NSP)',
  nameTa: 'தேசிய கல்வி உதவித்தொகை இணையதளம் (NSP)',
  categoryLabel: 'Official Government Scholarship Portal',
  whatItIs: 'Official government electronic portal providing student scholarship schemes, eligibility guidelines, and online application portal for pre-matric, post-matric, and higher education.',
  whatItIsTa: 'மாணவ, மாணவிகளுக்கான மத்திய மற்றும் மாநில அரசு கல்வி உதவித்தொகை திட்டங்களின் அதிகாரப்பூர்வ இணையதளம்.',
  officialDepartment: 'Ministry of Electronics and Information Technology & Ministry of Education, Government of India',
  officialInfoUrl: 'https://scholarships.gov.in/',
  officialSourceUrl: 'https://scholarships.gov.in/',
  applicationUrl: 'https://scholarships.gov.in/',
  eligibilityUrl: 'https://scholarships.gov.in/',
  statusUrl: 'https://scholarships.gov.in/',
  grievanceUrl: 'https://scholarships.gov.in/',
  lastVerified: '2026-10-01',
  actions: [
    { label: 'Open Official Scholarship Portal', url: 'https://scholarships.gov.in/', type: 'apply' },
    { label: 'Check Official Eligibility', url: 'https://scholarships.gov.in/', type: 'eligibility' },
    { label: 'Check Application Status', url: 'https://scholarships.gov.in/', type: 'status' },
    { label: 'Open Official Website', url: 'https://scholarships.gov.in/', type: 'official' },
  ],
};

export const ONE_STOP_CENTRE_CARD: SchemeCardData = {
  schemeId: 'one-stop-centre',
  schemeName: 'One Stop Centre (Sakhi)',
  nameTa: 'ஒரு நிறுத்த மையம் (சகி) & மகளிர் உதவி எண் 181',
  categoryLabel: "Women's Safety & Distress Support",
  whatItIs: '24/7 integrated emergency response, police help, medical aid, legal aid, and counseling for women in distress or facing domestic violence.',
  whatItIsTa: 'குடும்ப வன்முறை அல்லது துன்புறுத்தலால் பாதிக்கப்பட்ட பெண்களுக்கு 24 மணி நேர இலவச உதவி, மருத்துவ சிகிச்சை, சட்ட உதவி மற்றும் தற்காலிக தங்குமிடம்.',
  officialDepartment: 'Ministry of Women and Child Development, Government of India',
  officialInfoUrl: 'https://wcd.gov.in/offerings/one-stop-centre-scheme',
  officialSourceUrl: 'https://wcd.gov.in/offerings/one-stop-centre-scheme',
  eligibilityUrl: 'https://wcd.gov.in/offerings/one-stop-centre-scheme',
  lastVerified: '2026-10-01',
  actions: [
    { label: 'Open Official Website', url: 'https://wcd.gov.in/offerings/one-stop-centre-scheme', type: 'official' },
    { label: 'Official Scheme Information', url: 'https://wcd.gov.in/offerings/one-stop-centre-scheme', type: 'info' },
    { label: 'Check Official Eligibility', url: 'https://wcd.gov.in/offerings/one-stop-centre-scheme', type: 'eligibility' },
  ],
};

export function getSchemeById(id: string): WomenScheme | undefined {
  if (id === 'sakhi-181' || id === 'one-stop-centre' || id === 'osc') {
    return VERIFIED_WOMEN_SCHEMES.find((s) => s.id === 'one-stop-centre');
  }
  return VERIFIED_WOMEN_SCHEMES.find((s) => s.id === id);
}

export function determineUserIntent(query: string): SchemeLinkType | undefined {
  const q = query.toLowerCase();

  // Status check
  if (
    q.includes('status') ||
    q.includes('track') ||
    q.includes('check my application') ||
    q.includes('check application') ||
    q.includes('விண்ணப்ப நிலை') ||
    q.includes('ஸ்டேட்டஸ்')
  ) {
    return 'status';
  }

  // Grievance / Complain
  if (
    q.includes('complain') ||
    q.includes('complaint') ||
    q.includes('grievance') ||
    q.includes('புகார்')
  ) {
    return 'grievance';
  }

  // Eligibility
  if (
    q.includes('eligibility') ||
    q.includes('eligible') ||
    q.includes('am i eligible') ||
    q.includes('check eligibility') ||
    q.includes('தகுதி') ||
    q.includes('தகுதியா')
  ) {
    return 'eligibility';
  }

  // Application / Registration
  if (
    q.includes('apply') ||
    q.includes('application') ||
    q.includes('register') ||
    q.includes('registration') ||
    q.includes('எங்கே apply') ||
    q.includes('எங்கு apply') ||
    q.includes('விண்ணப்பிக்க') ||
    q.includes('பதிவு செய்ய')
  ) {
    return 'apply';
  }

  // Info
  if (
    q.includes('tell me about') ||
    q.includes('what is') ||
    q.includes('information') ||
    q.includes('details') ||
    q.includes('விளக்கம்') ||
    q.includes('பற்றி சொல்லுங்கள்')
  ) {
    return 'info';
  }

  // Official Website / Portal / Link
  if (
    q.includes('official website') ||
    q.includes('give me the website') ||
    q.includes('give me the official website') ||
    q.includes('where is the website') ||
    q.includes('where is the official website') ||
    q.includes('open the website') ||
    q.includes('open website') ||
    q.includes('where is the link') ||
    q.includes('give me the link') ||
    q.includes('link') ||
    q.includes('portal') ||
    q.includes('இணையதளம்') ||
    q.includes('இணைப்பு')
  ) {
    return 'official';
  }

  return undefined;
}

export function buildSchemeCard(scheme: WomenScheme, intent?: SchemeLinkType): SchemeCardData {
  const actions: SchemeActionLink[] = [];
  let noVerifiedAppUrlWarning = false;

  const appUrl = scheme.officialApplicationUrl || scheme.applicationUrl;
  const infoUrl = scheme.officialInfoUrl || scheme.officialSourceUrl || scheme.officialWebsite;
  const eligUrl = scheme.eligibilityUrl || infoUrl;

  // 1. APPLICATION / REGISTRATION (Only if verified)
  if (scheme.id === 'pmmvy') {
    actions.push({
      label: 'Open Official PMMVY Portal',
      url: 'https://pmmvy.wcd.gov.in',
      type: 'apply',
      isPmmvyPortal: true,
    });
  } else if (scheme.id === 'nsp') {
    actions.push({
      label: 'Open Official Scholarship Portal',
      url: 'https://scholarships.gov.in/',
      type: 'apply',
    });
  } else if (appUrl) {
    actions.push({
      label: 'Apply on Official Website',
      url: appUrl,
      type: 'apply',
    });
  } else {
    // If no online application URL exists (e.g. One Stop Centre, Shakti Sadan, offline)
    noVerifiedAppUrlWarning = true;
    actions.push({
      label: 'Official Scheme Information',
      url: infoUrl,
      type: 'info',
    });
  }

  // 2. ELIGIBILITY
  if (scheme.id === 'pmmvy') {
    actions.push({
      label: 'Check PMMVY Eligibility',
      url: 'https://www.wcd.gov.in/women/pradhan-mantri-matru-vandana-yojna',
      type: 'eligibility',
    });
  } else if (eligUrl) {
    actions.push({
      label: 'Check Official Eligibility',
      url: eligUrl,
      type: 'eligibility',
    });
  }

  // 3. STATUS (only if verified status URL exists!)
  const statusUrl = scheme.officialStatusUrl || scheme.statusUrl;
  if (statusUrl) {
    actions.push({
      label: 'Check Application Status',
      url: statusUrl,
      type: 'status',
    });
  }

  // 4. GRIEVANCE (if verified)
  if (scheme.grievanceUrl) {
    actions.push({
      label: 'Official Grievance Portal',
      url: scheme.grievanceUrl,
      type: 'grievance',
    });
  }

  // 5. MAIN PORTAL / OFFICIAL WEBSITE
  actions.push({
    label: 'Open Official Website',
    url: scheme.officialWebsite || infoUrl,
    type: 'official',
  });

  return {
    schemeId: scheme.id,
    schemeName: scheme.schemeName,
    nameTa: scheme.nameTa,
    categoryLabel: scheme.categoryLabel,
    whatItIs: scheme.description || scheme.simpleDescription,
    whatItIsTa: scheme.descriptionTa || scheme.simpleDescriptionTa,
    officialDepartment: scheme.officialDepartment,
    officialSourceUrl: scheme.officialSourceUrl,
    officialInfoUrl: scheme.officialInfoUrl,
    applicationUrl: appUrl || undefined,
    eligibilityUrl: eligUrl,
    statusUrl: statusUrl || undefined,
    grievanceUrl: scheme.grievanceUrl,
    lastVerified: scheme.lastVerified,
    actions,
    noVerifiedAppUrlWarning,
  };
}

export function createActiveContextFromScheme(scheme: WomenScheme, intent?: SchemeLinkType): ActiveSchemeContext {
  const card = buildSchemeCard(scheme, intent);
  let chosenLink = scheme.officialWebsite;
  let linkType: string = 'official';

  if (intent === 'apply' && (scheme.officialApplicationUrl || scheme.applicationUrl)) {
    chosenLink = scheme.officialApplicationUrl || scheme.applicationUrl!;
    linkType = 'apply';
  } else if (intent === 'eligibility' && (scheme.eligibilityUrl || scheme.officialInfoUrl)) {
    chosenLink = scheme.eligibilityUrl || scheme.officialInfoUrl;
    linkType = 'eligibility';
  } else if (intent === 'status' && (scheme.officialStatusUrl || scheme.statusUrl)) {
    chosenLink = scheme.officialStatusUrl || scheme.statusUrl!;
    linkType = 'status';
  } else if (scheme.id === 'pmmvy') {
    chosenLink = 'https://pmmvy.wcd.gov.in';
    linkType = 'apply';
  } else if (scheme.id === 'nsp') {
    chosenLink = 'https://scholarships.gov.in/';
    linkType = 'apply';
  }

  return {
    currentSchemeId: scheme.id,
    currentSchemeName: scheme.schemeName,
    category: scheme.category,
    officialLink: chosenLink,
    officialLinkType: linkType,
    schemeSource: scheme.officialDepartment,
    linkVerified: true,
  };
}

export function findSchemeCardForQuery(
  query: string,
  currentSchemeId?: string,
  serviceMode?: string
): SchemeCardData | undefined {
  const q = query.toLowerCase();
  const intent = determineUserIntent(query);

  // 1. VIOLENCE AT HOME / ABUSE / ONE STOP CENTRE (SAKHI)
  if (
    q.includes('violence') ||
    q.includes('domestic violence') ||
    q.includes('violence at home') ||
    q.includes('abuse') ||
    q.includes('harassment') ||
    q.includes('facing violence') ||
    q.includes('one stop centre') ||
    q.includes('osc') ||
    q.includes('sakhi') ||
    q.includes('181') ||
    q.includes('emergency') ||
    q.includes('வன்முறை') ||
    q.includes('துன்புறுத்தல்') ||
    q.includes('பாதுகாப்பு')
  ) {
    const osc = getSchemeById('one-stop-centre');
    return osc ? buildSchemeCard(osc, intent) : ONE_STOP_CENTRE_CARD;
  }

  // 2. SAFE PLACE TO STAY / SHELTER / DESTITUTE WOMEN (SHAKTI SADAN)
  if (
    q.includes('safe place to stay') ||
    q.includes('safe place') ||
    q.includes('shelter') ||
    q.includes('shakti sadan') ||
    q.includes('destitute') ||
    q.includes('difficult circumstances') ||
    q.includes('தங்குமிடம்') ||
    q.includes('பாதுகாப்பான இடம்') ||
    q.includes('ஆதரவற்ற')
  ) {
    const shaktiSadan = getSchemeById('shakti-sadan');
    return shaktiSadan ? buildSchemeCard(shaktiSadan, intent) : undefined;
  }

  // 3. MISSION SHAKTI
  if (
    q.includes('mission shakti') ||
    q.includes('women empowerment') ||
    q.includes('மகளிர் சக்தி')
  ) {
    const ms = getSchemeById('mission-shakti');
    return ms ? buildSchemeCard(ms, intent) : undefined;
  }

  // 4. PREGNANCY & MATERNITY (PMMVY)
  if (
    q.includes('pregnant') ||
    q.includes('pregnancy') ||
    q.includes('maternity') ||
    q.includes('lactating') ||
    q.includes('pmmvy') ||
    q.includes('கர்ப்ப') ||
    q.includes('பேறுகாலம்')
  ) {
    const pmmvy = getSchemeById('pmmvy');
    return pmmvy ? buildSchemeCard(pmmvy, intent) : undefined;
  }

  // 5. STUDENT SCHOLARSHIPS / EDUCATION ASSISTANCE (NSP)
  if (
    q.includes('scholarship') ||
    q.includes('student scholarship') ||
    q.includes('nsp') ||
    q.includes('scholarships') ||
    q.includes('fees') ||
    q.includes('கல்வி உதவித்தொகை') ||
    q.includes('ஸ்காலர்ஷிப்') ||
    (q.includes('daughter') && q.includes('scholarship')) ||
    (q.includes('student') && (q.includes('scheme') || q.includes('help') || q.includes('support')))
  ) {
    const nsp = getSchemeById('nsp');
    return nsp ? buildSchemeCard(nsp, intent) : NSP_PORTAL_CARD;
  }

  // 6. WORKING WOMEN HOSTEL / CHILDCARE (SAKHI NIWAS)
  if (
    q.includes('working women hostel') ||
    q.includes('sakhi niwas') ||
    q.includes('women hostel') ||
    q.includes('hostel for women') ||
    q.includes('childcare for working mothers') ||
    q.includes('creche') ||
    q.includes('விடுதி')
  ) {
    const hostel = getSchemeById('sakhi-niwas');
    return hostel ? buildSchemeCard(hostel, intent) : undefined;
  }

  // 7. GIRL CHILD SAVINGS / SUKANYA SAMRIDDHI (SSY)
  if (
    q.includes('sukanya') ||
    q.includes('ssy') ||
    (q.includes('girl') && (q.includes('child') || q.includes('daughter') || q.includes('savings'))) ||
    q.includes('செல்வ மகள்')
  ) {
    const ssy = getSchemeById('ssy');
    return ssy ? buildSchemeCard(ssy, intent) : undefined;
  }

  // 8. LIVELIHOOD / WORK / SHG / LAKHPATI DIDI
  if (
    q.includes('lakhpati') ||
    q.includes('shg') ||
    q.includes('self-help group') ||
    q.includes('find work') ||
    q.includes('livelihood') ||
    q.includes('சுயஉதவி') ||
    q.includes('வேலை')
  ) {
    const lk = getSchemeById('lakhpati-didi');
    return lk ? buildSchemeCard(lk, intent) : undefined;
  }

  // 9. WOMEN ENTREPRENEURSHIP / BUSINESS LOAN / MUDRA / STANDUP
  if (
    q.includes('mudra') ||
    q.includes('business loan') ||
    q.includes('small business') ||
    q.includes('entrepreneurship') ||
    q.includes('standup') ||
    q.includes('தொழில் கடன்') ||
    q.includes('சிறு தொழில்')
  ) {
    const mudra = getSchemeById('pm-mudra');
    return mudra ? buildSchemeCard(mudra, intent) : undefined;
  }

  // 10. TAMIL NADU GIRL HIGHER EDUCATION / PUDHUMAI PENN
  if (
    q.includes('pudhumai') ||
    q.includes('pudhumaipenn') ||
    (q.includes('college') && q.includes('girl') && q.includes('tamil nadu')) ||
    q.includes('புதுமைப் பெண்')
  ) {
    const pp = getSchemeById('pudhumaipenn');
    return pp ? buildSchemeCard(pp, intent) : undefined;
  }

  // 11. TAMIL NADU BASIC INCOME / KMUT (₹1,000)
  if (
    q.includes('urimai') ||
    q.includes('kmut') ||
    q.includes('மகளிர் உரிமை') ||
    (q.includes('1000') && (q.includes('family') || q.includes('monthly') || q.includes('மாதம்')))
  ) {
    const kmut = getSchemeById('kmut');
    return kmut ? buildSchemeCard(kmut, intent) : undefined;
  }

  // 12. LPG COOKING GAS / UJJWALA
  if (
    q.includes('ujjwala') ||
    q.includes('cylinder') ||
    q.includes('lpg') ||
    q.includes('எரிவாயு') ||
    q.includes('உஜ்வாலா')
  ) {
    const ujj = getSchemeById('pm-ujjwala');
    return ujj ? buildSchemeCard(ujj, intent) : undefined;
  }

  // 13. GENERAL WOMEN GOVERNMENT SCHEMES / DISCOVERY REQUEST
  if (
    q.includes('women government schemes') ||
    q.includes('women schemes') ||
    q.includes('government schemes for women') ||
    q.includes('schemes for women') ||
    q.includes('schemes for me') ||
    q.includes('womenக்கு என்ன government schemes') ||
    q.includes('government schemes எங்கே பார்க்கலாம்') ||
    q.includes('அரசு திட்டங்கள் எங்கே') ||
    q.includes('what schemes are available')
  ) {
    return MYSCHEME_PORTAL_CARD;
  }

  // 14. CONTEXTUAL RESOLUTION: User asks an action query without re-naming the scheme
  // (e.g. "Where do I apply?", "Give me the official website", "How do I check status?", "Where can I register?")
  if (
    intent !== undefined ||
    q.includes('where can i apply') ||
    q.includes('where do i apply') ||
    q.includes('how do i apply') ||
    q.includes('where can i register') ||
    q.includes('where do i register') ||
    q.includes('give me the official website') ||
    q.includes('give me the website') ||
    q.includes('where is the official website') ||
    q.includes('where is the website') ||
    q.includes('where is the link') ||
    q.includes('give me the link') ||
    q.includes('open the website') ||
    q.includes('open website') ||
    q.includes('check status') ||
    q.includes('எங்கே apply') ||
    q.includes('இணைப்பு எங்கே')
  ) {
    // If a specific scheme is in current context, resolve to THAT scheme:
    if (currentSchemeId) {
      if (currentSchemeId === 'nsp') return NSP_PORTAL_CARD;
      if (currentSchemeId === 'myscheme') return MYSCHEME_PORTAL_CARD;
      if (currentSchemeId === 'one-stop-centre') return ONE_STOP_CENTRE_CARD;
      const active = getSchemeById(currentSchemeId);
      if (active) return buildSchemeCard(active, intent);
    }

    if (serviceMode === 'pmmvy') {
      const pmmvy = getSchemeById('pmmvy');
      return pmmvy ? buildSchemeCard(pmmvy, intent) : undefined;
    }

    // Default to official myScheme platform if no specific scheme is active
    return MYSCHEME_PORTAL_CARD;
  }

  return undefined;
}
