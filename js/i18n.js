/**
 * Distribution Life — English / Urdu bilingual support.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'dl-lang';

  const strings = {
    en: {
      'meta.title': 'Distribution Life',
      'meta.description':
        'Distribution Life — Windows software for beverage and FMCG distributor offices. Route collections, bank deposits, treasury, and driver reports.',
      'nav.features': 'Features',
      'nav.how': 'How It Works',
      'nav.download': 'Download',
      'nav.faq': 'FAQ',
      'nav.sales': 'Contact sales',
      'hero.badge': 'Beverage & FMCG distribution',
      'hero.title': 'Software for distributor office collections, deposits, and treasury.',
      'hero.body':
        'Distribution Life is a Windows desktop application for beverage and FMCG distributor offices.<br>It records route collections, bank deposits, treasury activity, and driver balances in one place.',
      'hero.ctaFeatures': 'View modules',
      'hero.trustNote': 'Windows desktop software · Used at distributor offices daily',
      'marquee.item1': 'Route Collections',
      'marquee.item2': 'Bank Deposits',
      'marquee.item3': 'Treasury & Expenses',
      'marquee.item4': 'Driver Accountability',
      'marquee.item5': 'End-of-day Reports',
      'marquee.item6': 'Cash on Hand',
      'marquee.item7': 'Beverage & FMCG',
      'marquee.item8': 'Daily Close',
      'trust.label': 'Trusted in daily operations',
      'trust.body': 'Active at Shafqat Traders, authorized Coca-Cola distributor Gujranwala',
      'partner.label': 'Trusted in daily operations',
      'partner.role': 'Authorized Coca-Cola distributor · Gujranwala',
      'partner.regional': "One of the region's main Coca-Cola distribution offices.",
      'partner.active': 'Active installation',
      'partner.disclaimer':
        'Coca-Cola is a registered trademark of The Coca-Cola Company. Shafqat Traders is an independent authorized distributor. Distribution Life is not affiliated with or endorsed by The Coca-Cola Company.',
      'stats.steps': 'Steps to close the day',
      'stats.modules': 'Core office modules',
      'stats.multiValue': 'Multi',
      'stats.multi': 'Staff accounts with roles',
      'stats.reportsValue': 'Daily',
      'stats.reports': 'Printable end-of-day reports',
      'problem.label': 'The challenge',
      'problem.body':
        'When collections, deposits, and driver balances are kept in different places, end-of-day closing takes longer and shortfalls are harder to verify.',
      'problem.li1': 'Lengthy end-of-day reconciliation',
      'problem.li2': 'Collection and deposit differences that are difficult to trace',
      'problem.li3': 'Incomplete driver shortage and overage history',
      'solution.label': 'What Distribution Life does',
      'solution.body':
        'Collections, deposits, expenses, and driver accounts are recorded in a single system so the office can close against documented figures.',
      'solution.li1': 'Collections linked to route and driver',
      'solution.li2': 'Deposits and expenses matched to treasury',
      'solution.li3': 'Printable reports for review and filing',
      'features.label': 'Modules',
      'features.title': 'Everything your office needs to close the day',
      'features.body': 'Route collections, bank deposits, treasury, and driver reporting.',
      'features.routeTitle': 'Route Collections',
      'features.routeBody':
        'Record cash, check, and credit collections against the driver and route when the truck returns.',
      'features.bankTitle': 'Bank Deposits',
      'features.bankBody': "Log deposits by bank account and link them to the day's collections.",
      'features.treasuryTitle': 'Treasury & Expenses',
      'features.treasuryBody':
        'Track fuel, allowances, petty cash, and other costs against the treasury balance.',
      'features.driverTitle': 'Driver Accountability & Reports',
      'features.driverBody':
        'Maintain shortage and overage history per driver, with printable daily and period reports.',
      'how.label': 'Daily process',
      'how.title': 'From route return to end-of-day close',
      'how.body': 'From route return to end-of-day close, in the usual order of office work.',
      'how.step1Title': 'Enter collections',
      'how.step1Body':
        'Encode receipts for cash, coins, checks, and related deposits against each driver and route.',
      'how.step2Title': 'Record deposits and expenses',
      'how.step2Body':
        'Enter bank deposits and treasury outflows so they can be checked against collections.',
      'how.step3Title': 'Print and close',
      'how.step3Body':
        'Print the daily summary, driver sheet, and treasury report for signature and filing.',
      'autofill.label': 'Route collections',
      'autofill.title': 'Enter a collection in seconds',
      'autofill.body':
        'Driver, billing, and packaging — filled step by step as your office records the route.',
      'autofill.modalTitle': 'Add Collection',
      'autofill.fldDate': 'Date',
      'autofill.fldDriver': 'Driver',
      'autofill.fldTotalBill': 'Total Bill',
      'autofill.fldDiscount': 'Discount',
      'autofill.fldRouteExp': 'Route Expenses',
      'autofill.fldCategory': 'Route Expense Category',
      'autofill.fldShell': 'Shell',
      'autofill.secDriver': 'Driver Information',
      'autofill.secBilling': 'Billing',
      'autofill.secPackaging': 'Packaging (took / returned)',
      'autofill.btnCancel': 'Cancel',
      'autofill.btnSave': 'Save Collection',
      'autofill.statusDate': 'Date set',
      'autofill.statusDriver': 'Driver linked',
      'autofill.statusBill': 'Recorded',
      'autofill.statusDiscount': 'Applied',
      'autofill.statusExp': 'Logged',
      'autofill.statusCategory': 'Selected',
      'autofill.statusPackaging': 'Counted',
      'autofill.statusSaved': 'Saved',
      'autofill.floatDriver': 'Driver linked',
      'autofill.floatBill': 'Billing entered',
      'autofill.floatPackaging': 'Packaging logged',
      'autofill.floatSaved': 'Ready to save',
      'pdf.label': 'End-of-day reports',
      'pdf.title': 'Day summarized in a single page',
      'pdf.body':
        'One click exports the Daily Collection Summary — every driver, total, and shortfall on one sheet.',
      'pdf.reportsTitle': 'Reports',
      'pdf.reportsSub': 'Preview and export distributor reports.',
      'pdf.fldReport': 'Report',
      'pdf.reportName': 'Daily Collection Summary',
      'pdf.fldDate': 'Date',
      'pdf.btnPreview': 'Preview',
      'pdf.btnSave': 'Save PDF',
      'pdf.tagline': 'Day summarized in a single page',
      'pdf.statusExported': 'PDF exported',
      'pdf.hint': 'Click <strong>Save PDF</strong> — or scroll here to watch it auto-play.',
      'tour.label': 'Screens',
      'tour.title': 'See the product your team will use every day',
      'tour.body': 'Login, daily overview, and built-in guidance for staff.',
      'tour.tabLogin': 'Login',
      'tour.tabDashboard': 'Daily overview',
      'tour.tabGuide': 'User guide',
      'tour.loginTitle': 'Login',
      'tour.loginBody': ' — role-based access with named user accounts',
      'tour.dashTitle': 'Daily overview',
      'tour.dashBody': ' — collections, shortfalls, cash on hand, and driver balances',
      'tour.guideTitle': 'User guide',
      'tour.guideBody': ' — on-screen steps for the daily workflow',
      'customers.label': 'Installation',
      'customers.title': 'In daily use at distributor offices',
      'customers.body': 'In daily use at the office below.',
      'customers.role': 'Distributor office · Gujranwala',
      'customers.note': "One of the region's main Coca-Cola distribution offices.",
      'customers.active': 'Active',
      'customers.disclaimer':
        'Coca-Cola is a registered trademark of The Coca-Cola Company. Shafqat Traders is an independent authorized distributor. Distribution Life is not affiliated with or endorsed by The Coca-Cola Company.',
      'success.title': 'Our customers achieve more',
      'success.caseTag': 'Distribution',
      'success.caseStat': 'Steps to close the day',
      'success.caseLink': 'See the daily process →',
      'success.quote':
        'Collections, deposits, and driver balances are in <strong>one system</strong> — end-of-day close is against <strong>documented figures</strong>.',
      'success.author': '— Office manager, Shafqat Traders',
      'showcase.label': 'One system',
      'showcase.title': 'Built for distributor office work',
      'showcase.body': 'Collections, deposits, treasury, and driver balances — connected as you scroll.',
      'showcase.card1Label': 'Route Collections',
      'showcase.card1Meta': 'Cash, check, credit',
      'showcase.card2Label': 'Bank Deposits',
      'showcase.card3Label': 'Treasury',
      'showcase.card3Meta': 'Cash on hand',
      'showcase.card4Label': 'Driver sheet',
      'showcase.card5Label': 'Daily overview',
      'showcase.card6Label': 'End-of-day',
      'showcase.card6Meta': 'Print & close',
      'showcase.balanced': 'Balanced',
      'cta.copyEmail': 'Copy Email',
      'cta.gmail': 'Open in Gmail',
      'cta.copied': 'Email copied to clipboard.',
      'cta.copyPrompt': 'Copy this email address:',
      'cta.copyFallback': 'Email shown — copy it from the dialog if needed.',
      'faq.label': 'FAQ',
      'faq.title': 'Common questions',
      'faq.q1': 'How do updates work?',
      'faq.a1':
        'New versions are posted on the Download page. Install the latest build when the office is ready to update.',
      'faq.q2': 'Can multiple staff members use it at the same time?',
      'faq.a2':
        'Yes. Cashiers, encoders, and managers can have separate accounts with different permissions. Each entry is linked to a named user.',
      'faq.q3': 'What reports can I print?',
      'faq.a3':
        'Daily collection summaries, bank deposit reports, treasury and expense ledgers, and per-driver accountability sheets.',
      'footer.tagline': 'Distributor office software for collections, deposits, and treasury.',
      'footer.ctaTitle': 'Ready to see Distribution Life in your office?',
      'footer.ctaBody': 'Contact sales or download the latest Windows installer.',
      'footer.rights': '© 2026 Forza Inc. All rights reserved.',
      'footer.privacy': 'Privacy',
      'footer.contact': 'Contact',
      'footer.disclaimer':
        'Distribution Life is a product of Forza Inc. and is not affiliated with or endorsed by any beverage or FMCG manufacturer.',
      'dl.back': '← Back to website',
      'dl.label': 'Download',
      'dl.title': 'Distribution Life for Windows',
      'dl.intro': 'Download the Windows installer for Distribution Life.',
      'dl.windowsLatest': 'Windows Latest',
      'dl.version': 'Version 1.0.1',
      'dl.date101': '18 July 2026',
      'dl.notes101':
        'Self-updating app. Packaging counts for shells, empties, and pallets. Fixes on the drivers screen.',
      'dl.downloadBtn': 'Download for Windows',
      'dl.warn':
        'Chrome or Windows may show a warning for new software. Choose Download anyway or Run anyway.',
      'dl.req1': 'Windows 10 and Windows 11',
      'dl.req2': 'One install per computer',
      'dl.versions': 'Versions',
      'dl.versionsIntro': 'Release notes.',
      'dl.latest': 'Latest',
      'dl.notes101Short':
        'Auto updates. Packaging counts for shells, empties, and pallets. Fixes on the drivers screen.',
      'dl.version100': 'Version 1.0.0',
      'dl.date100': '15 July 2026',
      'dl.notes100': 'Initial Windows release.',
      'dl.help': 'Need help? Contact us',
      'dl.rights': '© 2026 Forza Inc.',
    },
    ur: {
      'meta.title': 'ڈسٹری بیوشن لائف',
      'meta.description':
        'ڈسٹری بیوشن لائف — مشروبات اور ایف ایم سی جی ڈسٹری بیوٹر دفاتر کے لیے ونڈوز سافٹ ویئر۔ روٹ کلیکشن، بینک ڈپازٹ، خزانہ اور ڈرائیور رپورٹس۔',
      'nav.features': 'ماڈیولز',
      'nav.how': 'عمل',
      'nav.download': 'ڈاؤن لوڈ',
      'nav.faq': 'سوالات',
      'nav.sales': 'سیلز سے رابطہ',
      'hero.badge': 'مشروبات اور ایف ایم سی جی ڈسٹری بیوشن',
      'hero.title': 'ڈسٹری بیوٹر آفس کے لیے کلیکشن، ڈپازٹ اور خزانہ کا سافٹ ویئر۔',
      'hero.body':
        'ڈسٹری بیوشن لائف مشروبات اور ایف ایم سی جی ڈسٹری بیوٹر دفاتر کے لیے ونڈوز ڈیسک ٹاپ ایپلیکیشن ہے۔<br>روٹ کلیکشن، بینک ڈپازٹ، خزانہ کی سرگرمی اور ڈرائیور بیلنس ایک جگہ درج ہوتی ہے۔',
      'hero.ctaFeatures': 'ماڈیولز دیکھیں',
      'hero.trustNote': 'ونڈوز ڈیسک ٹاپ سافٹ ویئر · ڈسٹری بیوٹر دفاتر میں روزانہ استعمال',
      'marquee.item1': 'روٹ کلیکشنز',
      'marquee.item2': 'بینک ڈپازٹس',
      'marquee.item3': 'خزانہ اور اخراجات',
      'marquee.item4': 'ڈرائیور احتساب',
      'marquee.item5': 'اینڈ آف ڈے رپورٹس',
      'marquee.item6': 'ہاتھ میں کیش',
      'marquee.item7': 'مشروبات اور ایف ایم سی جی',
      'marquee.item8': 'روزانہ کلوز',
      'trust.label': 'روزمرہ عمل میں قابل اعتماد',
      'trust.body': 'شفقت ٹریڈرز میں فعال، مجاز کوکا کولا ڈسٹری بیوٹر گوجرانوالہ',
      'partner.label': 'روزمرہ عمل میں قابل اعتماد',
      'partner.role': 'مجاز کوکا کولا ڈسٹری بیوٹر · گوجرانوالہ',
      'partner.regional': 'علاقے کے اہم کوکا کولا ڈسٹری بیوشن دفاتر میں سے ایک۔',
      'partner.active': 'فعال انسٹالیشن',
      'partner.disclaimer':
        'کوکا کولا دی کوکا کولا کمپنی کا رجسٹرڈ ٹریڈ مارک ہے۔ شفقت ٹریڈرز ایک آزاد مجاز ڈسٹری بیوٹر ہے۔ ڈسٹری بیوشن لائف دی کوکا کولا کمپنی سے وابستہ یا منظور شدہ نہیں۔',
      'stats.steps': 'دن بند کرنے کے مراحل',
      'stats.modules': 'بنیادی آفس ماڈیولز',
      'stats.multiValue': 'متعدد',
      'stats.multi': 'کرداروں کے ساتھ عملے کے اکاؤنٹس',
      'stats.reportsValue': 'روزانہ',
      'stats.reports': 'پرنٹ ایبل اینڈ آف ڈے رپورٹس',
      'problem.label': 'مسئلہ',
      'problem.body':
        'جب کلیکشن، ڈپازٹ اور ڈرائیور بیلنس الگ جگہوں پر ہوں تو دن کے اختتام کی کلوزنگ زیادہ وقت لیتی ہے اور شارٹیج کی تصدیق مشکل ہوتی ہے۔',
      'problem.li1': 'طویل اینڈ آف ڈے ری کنسلی ایشن',
      'problem.li2': 'کلیکشن اور ڈپازٹ کے فرق جن کا سراغ لگانا مشکل ہو',
      'problem.li3': 'ڈرائیور شارٹیج اور اووریج کی نامکمل ہسٹری',
      'solution.label': 'ڈسٹری بیوشن لائف کیا کرتی ہے',
      'solution.body':
        'کلیکشن، ڈپازٹ، اخراجات اور ڈرائیور اکاؤنٹس ایک ہی سسٹم میں درج ہوتے ہیں تاکہ دفتر دستاویزی اعداد کے مطابق کلوز کر سکے۔',
      'solution.li1': 'کلیکشن روٹ اور ڈرائیور سے منسلک',
      'solution.li2': 'ڈپازٹ اور اخراجات خزانے سے مطابقت پذیر',
      'solution.li3': 'جائزے اور فائلنگ کے لیے پرنٹ ایبل رپورٹس',
      'features.label': 'ماڈیولز',
      'features.title': 'دن کی کلوزنگ کے لیے آپ کے آفس کی ہر ضرورت',
      'features.body': 'روٹ کلیکشن، بینک ڈپازٹ، خزانہ اور ڈرائیور رپورٹنگ۔',
      'features.routeTitle': 'روٹ کلیکشنز',
      'features.routeBody':
        'ٹرک واپسی پر نقد، چیک اور کریڈٹ کلیکشن ڈرائیور اور روٹ کے خلاف درج کریں۔',
      'features.bankTitle': 'بینک ڈپازٹس',
      'features.bankBody': 'بینک اکاؤنٹ کے لحاظ سے ڈپازٹ درج کریں اور دن کی کلیکشن سے جوڑیں۔',
      'features.treasuryTitle': 'خزانہ اور اخراجات',
      'features.treasuryBody':
        'ایندھن، الاؤنس، پیٹی کیش اور دیگر لاگت خزانہ بیلنس کے خلاف درج کریں۔',
      'features.driverTitle': 'ڈرائیور احتساب اور رپورٹس',
      'features.driverBody':
        'ہر ڈرائیور کی شارٹیج اور اووریج ہسٹری، روزانہ اور مدت وار پرنٹ ایبل رپورٹس کے ساتھ۔',
      'how.label': 'روزانہ عمل',
      'how.title': 'روٹ واپسی سے اینڈ آف ڈے کلوز تک',
      'how.body': 'روٹ واپسی سے اینڈ آف ڈے کلوز تک، آفس کے معمول کے کام کی ترتیب میں۔',
      'how.step1Title': 'کلیکشن درج کریں',
      'how.step1Body':
        'ہر ڈرائیور اور روٹ کے خلاف نقد، سکے، چیک اور متعلقہ ڈپازٹ کی رسیدیں انکوڈ کریں۔',
      'how.step2Title': 'ڈپازٹ اور اخراجات درج کریں',
      'how.step2Body':
        'بینک ڈپازٹ اور خزانے سے نکلنے والی رقوم درج کریں تاکہ کلیکشن سے جانچی جا سکیں۔',
      'how.step3Title': 'پرنٹ اور کلوز',
      'how.step3Body':
        'روزانہ خلاصہ، ڈرائیور شیٹ اور خزانہ رپورٹ دستخط اور فائلنگ کے لیے پرنٹ کریں۔',
      'autofill.label': 'روٹ کلیکشنز',
      'autofill.title': 'چند سیکنڈ میں کلیکشن درج کریں',
      'autofill.body':
        'ڈرائیور، بلنگ اور پیکجنگ — مرحلہ وار بھرتی جاتی ہے جیسے آپ کا دفتر روٹ ریکارڈ کرتا ہے۔',
      'autofill.modalTitle': 'کلیکشن شامل کریں',
      'autofill.fldDate': 'تاریخ',
      'autofill.fldDriver': 'ڈرائیور',
      'autofill.fldTotalBill': 'کل بل',
      'autofill.fldDiscount': 'رعایت',
      'autofill.fldRouteExp': 'روٹ اخراجات',
      'autofill.fldCategory': 'روٹ اخراجات کی قسم',
      'autofill.fldShell': 'شیل',
      'autofill.secDriver': 'ڈرائیور کی معلومات',
      'autofill.secBilling': 'بلنگ',
      'autofill.secPackaging': 'پیکجنگ (لی / واپس)',
      'autofill.btnCancel': 'منسوخ',
      'autofill.btnSave': 'کلیکشن محفوظ کریں',
      'autofill.statusDate': 'تاریخ مقرر',
      'autofill.statusDriver': 'ڈرائیور منسلک',
      'autofill.statusBill': 'درج شدہ',
      'autofill.statusDiscount': 'لاگو',
      'autofill.statusExp': 'درج',
      'autofill.statusCategory': 'منتخب',
      'autofill.statusPackaging': 'گنتی مکمل',
      'autofill.statusSaved': 'محفوظ',
      'autofill.floatDriver': 'ڈرائیور منسلک',
      'autofill.floatBill': 'بلنگ درج',
      'autofill.floatPackaging': 'پیکجنگ درج',
      'autofill.floatSaved': 'محفوظ کرنے کے لیے تیار',
      'pdf.label': 'دن کے اختتام کی رپورٹس',
      'pdf.title': 'دن کا خلاصہ ایک صفحے میں',
      'pdf.body':
        'ایک کلک سے Daily Collection Summary برآمد — ہر ڈرائیور، کل اور شارٹیج ایک شیٹ پر۔',
      'pdf.reportsTitle': 'رپورٹس',
      'pdf.reportsSub': 'ڈسٹری بیوٹر رپورٹس دیکھیں اور برآمد کریں۔',
      'pdf.fldReport': 'رپورٹ',
      'pdf.reportName': 'Daily Collection Summary',
      'pdf.fldDate': 'تاریخ',
      'pdf.btnPreview': 'پیش نظارہ',
      'pdf.btnSave': 'PDF محفوظ',
      'pdf.tagline': 'دن کا خلاصہ ایک صفحے میں',
      'pdf.statusExported': 'PDF برآمد',
      'pdf.hint': 'Save PDF پر کلک کریں — یا خودکار دیکھنے کے لیے یہاں سکرول کریں۔',
      'tour.label': 'اسکرینز',
      'tour.title': 'وہ پروڈکٹ دیکھیں جو آپ کی ٹیم روزانہ استعمال کرے گی',
      'tour.body': 'لاگ ان، روزانہ جائزہ، اور عملے کے لیے رہنمائی۔',
      'tour.tabLogin': 'لاگ ان',
      'tour.tabDashboard': 'روزانہ جائزہ',
      'tour.tabGuide': 'یوزر گائیڈ',
      'tour.loginTitle': 'لاگ ان',
      'tour.loginBody': ' — نامزد یوزر اکاؤنٹس کے ساتھ رول پر مبنی رسائی',
      'tour.dashTitle': 'روزانہ جائزہ',
      'tour.dashBody': ' — کلیکشن، شارٹیج، ہاتھ میں کیش اور ڈرائیور بیلنس',
      'tour.guideTitle': 'یوزر گائیڈ',
      'tour.guideBody': ' — روزمرہ ورک فلو کے آن اسکرین مراحل',
      'customers.label': 'انسٹالیشن',
      'customers.title': 'ڈسٹری بیوٹر دفاتر میں روزانہ استعمال',
      'customers.body': 'ذیل کے دفتر میں روزانہ استعمال میں۔',
      'customers.role': 'ڈسٹری بیوٹر دفتر · گوجرانوالہ',
      'customers.note': 'علاقے کے اہم کوکا کولا ڈسٹری بیوشن دفاتر میں سے ایک۔',
      'customers.active': 'فعال',
      'customers.disclaimer':
        'کوکا کولا دی کوکا کولا کمپنی کا رجسٹرڈ ٹریڈ مارک ہے۔ شفقت ٹریڈرز ایک آزاد مجاز ڈسٹری بیوٹر ہے۔ ڈسٹری بیوشن لائف دی کوکا کولا کمپنی سے وابستہ یا منظور شدہ نہیں۔',
      'success.title': 'ہمارے گاہک زیادہ حاصل کرتے ہیں',
      'success.caseTag': 'ڈسٹری بیوشن',
      'success.caseStat': 'دن بند کرنے کے مراحل',
      'success.caseLink': 'روزانہ عمل دیکھیں ←',
      'success.quote':
        'کلیکشن، ڈپازٹ اور ڈرائیور بیلنس <strong>ایک سسٹم</strong> میں ہیں — دن کی کلوزنگ <strong>دستاویزی اعداد</strong> کے مطابق ہوتی ہے۔',
      'success.author': '— آفس مینیجر، شفقت ٹریڈرز',
      'showcase.label': 'ایک سسٹم',
      'showcase.title': 'ڈسٹری بیوٹر آفس کے کام کے لیے',
      'showcase.body': 'کلیکشن، ڈپازٹ، خزانہ اور ڈرائیور بیلنس — سکرول کے ساتھ جڑے ہوئے۔',
      'showcase.card1Label': 'روٹ کلیکشنز',
      'showcase.card1Meta': 'نقد، چیک، کریڈٹ',
      'showcase.card2Label': 'بینک ڈپازٹس',
      'showcase.card3Label': 'خزانہ',
      'showcase.card3Meta': 'ہاتھ میں کیش',
      'showcase.card4Label': 'ڈرائیور شیٹ',
      'showcase.card5Label': 'روزانہ جائزہ',
      'showcase.card6Label': 'دن کا اختتام',
      'showcase.card6Meta': 'پرنٹ اور کلوز',
      'showcase.balanced': 'متوازن',
      'cta.copyEmail': 'ای میل کاپی کریں',
      'cta.gmail': 'جی میل میں کھولیں',
      'cta.copied': 'ای میل کلپ بورڈ پر کاپی ہو گئی۔',
      'cta.copyPrompt': 'یہ ای میل ایڈریس کاپی کریں:',
      'cta.copyFallback': 'ای میل دکھائی گئی — ضرورت ہو تو ڈائیلاگ سے کاپی کریں۔',
      'faq.label': 'سوالات',
      'faq.title': 'عام سوالات',
      'faq.q1': 'اپ ڈیٹس کیسے کام کرتی ہیں؟',
      'faq.a1':
        'نئے ورژن ڈاؤن لوڈ صفحے پر لگائے جاتے ہیں۔ جب دفتر تیار ہو، تازہ ترین بلڈ وہیں سے انسٹال کریں۔',
      'faq.q2': 'کیا کئی عملہ ایک ساتھ استعمال کر سکتے ہیں؟',
      'faq.a2':
        'ہاں۔ کیشئرز، انکوڈرز اور مینیجرز کے الگ اکاؤنٹس مختلف اجازتوں کے ساتھ ہو سکتے ہیں۔ ہر انٹری نامزد یوزر سے منسلک ہوتی ہے۔',
      'faq.q3': 'کون سی رپورٹس پرنٹ ہو سکتی ہیں؟',
      'faq.a3':
        'روزانہ کلیکشن خلاصے، بینک ڈپازٹ رپورٹس، خزانہ اور خرچ لیجرز، اور فی ڈرائیور احتساب شیٹس۔',
      'footer.tagline': 'کلیکشن، ڈپازٹ اور خزانہ کے لیے ڈسٹری بیوٹر آفس سافٹ ویئر۔',
      'footer.ctaTitle': 'اپنے آفس میں ڈسٹری بیوشن لائف دیکھنے کے لیے تیار ہیں؟',
      'footer.ctaBody': 'سیلز سے رابطہ کریں یا تازہ ترین ونڈوز انسٹالر ڈاؤن لوڈ کریں۔',
      'footer.rights': '© ۲۰۲۶ فورزا انک۔ جملہ حقوق محفوظ ہیں۔',
      'footer.privacy': 'پرائیویسی',
      'footer.contact': 'رابطہ',
      'footer.disclaimer':
        'ڈسٹری بیوشن لائف فورزا انک کی پروڈکٹ ہے اور کسی مشروب یا ایف ایم سی جی مینوفیکچرر سے وابستہ یا منظور شدہ نہیں۔',
      'dl.back': '← ویب سائٹ پر واپس',
      'dl.label': 'ڈاؤن لوڈ',
      'dl.title': 'ڈسٹری بیوشن لائف برائے ونڈوز',
      'dl.intro': 'ڈسٹری بیوشن لائف کا ونڈوز انسٹالر ڈاؤن لوڈ کریں۔',
      'dl.windowsLatest': 'ونڈوز تازہ ترین',
      'dl.version': 'ورژن ۱.۰.۱',
      'dl.date101': '۱۸ جولائی ۲۰۲۶',
      'dl.notes101':
        'خود اپ ڈیٹ ہونے والی ایپ۔ شیلز، ایمٹیز اور پیلیٹس کی پیکجنگ کاؤنٹس۔ ڈرائیورز اسکرین پر اصلاحات۔',
      'dl.downloadBtn': 'ونڈوز کے لیے ڈاؤن لوڈ',
      'dl.warn':
        'کروم یا ونڈوز نئے سافٹ ویئر پر انتباہ دکھا سکتا ہے۔ Download anyway یا Run anyway منتخب کریں۔',
      'dl.req1': 'ونڈوز ۱۰ اور ونڈوز ۱۱',
      'dl.req2': 'ایک کمپیوٹر پر ایک انسٹال',
      'dl.versions': 'ورژنز',
      'dl.versionsIntro': 'ریلیز نوٹس۔',
      'dl.latest': 'تازہ ترین',
      'dl.notes101Short':
        'آٹو اپ ڈیٹس۔ شیلز، ایمٹیز اور پیلیٹس کی پیکجنگ کاؤنٹس۔ ڈرائیورز اسکرین پر اصلاحات۔',
      'dl.version100': 'ورژن ۱.۰.۰',
      'dl.date100': '۱۵ جولائی ۲۰۲۶',
      'dl.notes100': 'پہلی ونڈوز ریلیز۔',
      'dl.help': 'مدد چاہیے؟ رابطہ کریں',
      'dl.rights': '© ۲۰۲۶ فورزا انک۔',
    },
  };

  let currentLang = 'en';

  function t(key) {
    return (strings[currentLang] && strings[currentLang][key]) || strings.en[key] || key;
  }

  function applyLanguage(lang) {
    if (!strings[lang]) return;
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      /* ignore */
    }

    const root = document.documentElement;
    root.lang = lang === 'ur' ? 'ur' : 'en';
    root.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ur', lang === 'ur');

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = t(key);
      if (value == null) return;
      if (el.hasAttribute('data-i18n-html') || /<br\s*\/?>/i.test(value)) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr');
      if (!spec) return;
      spec.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });

    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) document.title = t(titleEl.getAttribute('data-i18n'));

    const metaDesc = document.querySelector('meta[name="description"][data-i18n]');
    if (metaDesc) metaDesc.setAttribute('content', t(metaDesc.getAttribute('data-i18n')));

    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      const isActive = btn.getAttribute('data-set-lang') === lang;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('lang-btn-active', isActive);
    });

    document.dispatchEvent(new CustomEvent('dl:langchange', { detail: { lang } }));
  }

  function initLanguage() {
    let saved = 'en';
    try {
      saved = localStorage.getItem(STORAGE_KEY) || 'en';
    } catch (_) {
      /* ignore */
    }
    if (!strings[saved]) saved = 'en';

    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.getAttribute('data-set-lang'));
      });
    });

    applyLanguage(saved);
  }

  window.DLI18n = { t, applyLanguage, getLang: () => currentLang };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
  } else {
    initLanguage();
  }
})();
