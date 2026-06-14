document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // CONFIGURATION: GOOGLE SHEET WEB APP URL
    // Copy and paste your deployed Google Apps Script web app URL here.
    // E.g. const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycb.../exec";
    // ==========================================================================
    const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxWbqfxKAyAJayzpVc4si0ttOkof9ybxQ5Pzkakr49GdZgXFV8CRLOFFHp68vLBlm8/exec";

    /* ==========================================================================
       0. STATIC DATASETS (EMBEDDED DATABASE)
       ========================================================================== */
    
    // Blog Articles Dataset
    const BLOGS_DATA = [
    {
        "id": 1,
        "title": "Expert Advice on Metabolism - A Dietitian's Perspective",
        "slug": "expert-advice-on-metabolism---a-dietitians-perspective",
        "category": "Weight Loss",
        "meta_description": "Learn expert advice on metabolism - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get the best metabolism diet plans in Indore and online.",
        "excerpt": "Learn expert advice on metabolism - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get the b...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Metabolism</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Metabolism Matters</h2>
        <p>When it comes to metabolism, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized metabolism plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-13",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 2,
        "title": "5 Proven Tips for Indian Diet in 2026",
        "slug": "5-proven-tips-for-indian-diet-in-2026",
        "category": "Weight Loss",
        "meta_description": "Learn 5 proven tips for indian diet in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best indian diet diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for indian diet in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best indian diet di...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Indian Diet</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Indian Diet Matters</h2>
        <p>When it comes to indian diet, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized indian diet plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-05",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 3,
        "title": "A Clinical Approach to Fat Loss Backed by Science",
        "slug": "a-clinical-approach-to-fat-loss-backed-by-science",
        "category": "Weight Loss",
        "meta_description": "Learn a clinical approach to fat loss backed by science with expert clinical nutritionist Oshin Ambekar. Get the best fat loss diet plans in Indore and online.",
        "excerpt": "Learn a clinical approach to fat loss backed by science with expert clinical nutritionist Oshin Ambekar. Get the best fa...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Fat Loss</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Fat Loss Matters</h2>
        <p>When it comes to fat loss, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized fat loss plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 4,
        "title": "Top Foods for Belly Fat",
        "slug": "top-foods-for-belly-fat",
        "category": "Weight Loss",
        "meta_description": "Learn top foods for belly fat with expert clinical nutritionist Oshin Ambekar. Get the best belly fat diet plans in Indore and online.",
        "excerpt": "Learn top foods for belly fat with expert clinical nutritionist Oshin Ambekar. Get the best belly fat diet plans in Indo...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Belly Fat</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Belly Fat Matters</h2>
        <p>When it comes to belly fat, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized belly fat plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-10",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 5,
        "title": "Top Foods for Weight Loss Without Starving",
        "slug": "top-foods-for-weight-loss-without-starving",
        "category": "Weight Loss",
        "meta_description": "Learn top foods for weight loss without starving with expert clinical nutritionist Oshin Ambekar. Get the best weight loss diet plans in Indore and online.",
        "excerpt": "Learn top foods for weight loss without starving with expert clinical nutritionist Oshin Ambekar. Get the best weight lo...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Weight Loss</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Weight Loss Matters</h2>
        <p>When it comes to weight loss, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized weight loss plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-07",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 6,
        "title": "The Ultimate Guide to Calorie Deficit",
        "slug": "the-ultimate-guide-to-calorie-deficit",
        "category": "Weight Loss",
        "meta_description": "Learn the ultimate guide to calorie deficit with expert clinical nutritionist Oshin Ambekar. Get the best calorie deficit diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to calorie deficit with expert clinical nutritionist Oshin Ambekar. Get the best calorie defici...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 7,
        "title": "Expert Advice on Sustainable Weight Loss",
        "slug": "expert-advice-on-sustainable-weight-loss",
        "category": "Weight Loss",
        "meta_description": "Learn expert advice on sustainable weight loss with expert clinical nutritionist Oshin Ambekar. Get the best sustainable weight loss diet plans in Indore and online.",
        "excerpt": "Learn expert advice on sustainable weight loss with expert clinical nutritionist Oshin Ambekar. Get the best sustainable...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-03",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 8,
        "title": "The Ultimate Guide to Weight Loss in 2026",
        "slug": "the-ultimate-guide-to-weight-loss-in-2026",
        "category": "Weight Loss",
        "meta_description": "Learn the ultimate guide to weight loss in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best weight loss diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to weight loss in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best weight los...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-01",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 9,
        "title": "How to Manage Indian Diet",
        "slug": "how-to-manage-indian-diet",
        "category": "Weight Loss",
        "meta_description": "Learn how to manage indian diet with expert clinical nutritionist Oshin Ambekar. Get the best indian diet diet plans in Indore and online.",
        "excerpt": "Learn how to manage indian diet with expert clinical nutritionist Oshin Ambekar. Get the best indian diet diet plans in ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-03",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 10,
        "title": "The Best Diet for Metabolism",
        "slug": "the-best-diet-for-metabolism",
        "category": "Weight Loss",
        "meta_description": "Learn the best diet for metabolism with expert clinical nutritionist Oshin Ambekar. Get the best metabolism diet plans in Indore and online.",
        "excerpt": "Learn the best diet for metabolism with expert clinical nutritionist Oshin Ambekar. Get the best metabolism diet plans i...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-03",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 11,
        "title": "The Ultimate Guide to Sustainable Weight Loss",
        "slug": "the-ultimate-guide-to-sustainable-weight-loss",
        "category": "Weight Loss",
        "meta_description": "Learn the ultimate guide to sustainable weight loss with expert clinical nutritionist Oshin Ambekar. Get the best sustainable weight loss diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to sustainable weight loss with expert clinical nutritionist Oshin Ambekar. Get the best sustai...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-14",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 12,
        "title": "The Best Diet for Fat Loss",
        "slug": "the-best-diet-for-fat-loss",
        "category": "Weight Loss",
        "meta_description": "Learn the best diet for fat loss with expert clinical nutritionist Oshin Ambekar. Get the best fat loss diet plans in Indore and online.",
        "excerpt": "Learn the best diet for fat loss with expert clinical nutritionist Oshin Ambekar. Get the best fat loss diet plans in In...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-13",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 13,
        "title": "A Clinical Approach to Metabolism",
        "slug": "a-clinical-approach-to-metabolism",
        "category": "Weight Loss",
        "meta_description": "Learn a clinical approach to metabolism with expert clinical nutritionist Oshin Ambekar. Get the best metabolism diet plans in Indore and online.",
        "excerpt": "Learn a clinical approach to metabolism with expert clinical nutritionist Oshin Ambekar. Get the best metabolism diet pl...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-08",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 14,
        "title": "The Ultimate Guide to Fat Loss at Home",
        "slug": "the-ultimate-guide-to-fat-loss-at-home",
        "category": "Weight Loss",
        "meta_description": "Learn the ultimate guide to fat loss at home with expert clinical nutritionist Oshin Ambekar. Get the best fat loss diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to fat loss at home with expert clinical nutritionist Oshin Ambekar. Get the best fat loss diet...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-09",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 15,
        "title": "The Ultimate Guide to Belly Fat Backed by Science",
        "slug": "the-ultimate-guide-to-belly-fat-backed-by-science",
        "category": "Weight Loss",
        "meta_description": "Learn the ultimate guide to belly fat backed by science with expert clinical nutritionist Oshin Ambekar. Get the best belly fat diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to belly fat backed by science with expert clinical nutritionist Oshin Ambekar. Get the best be...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 16,
        "title": "Debunking Myths About Indian Diet",
        "slug": "debunking-myths-about-indian-diet",
        "category": "Weight Loss",
        "meta_description": "Learn debunking myths about indian diet with expert clinical nutritionist Oshin Ambekar. Get the best indian diet diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about indian diet with expert clinical nutritionist Oshin Ambekar. Get the best indian diet diet p...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-04",
        "read_time": "7 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 17,
        "title": "5 Proven Tips for Fat Loss for Busy Professionals",
        "slug": "5-proven-tips-for-fat-loss-for-busy-professionals",
        "category": "Weight Loss",
        "meta_description": "Learn 5 proven tips for fat loss for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best fat loss diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for fat loss for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best fa...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 18,
        "title": "Top Foods for Weight Loss Naturally",
        "slug": "top-foods-for-weight-loss-naturally",
        "category": "Weight Loss",
        "meta_description": "Learn top foods for weight loss naturally with expert clinical nutritionist Oshin Ambekar. Get the best weight loss diet plans in Indore and online.",
        "excerpt": "Learn top foods for weight loss naturally with expert clinical nutritionist Oshin Ambekar. Get the best weight loss diet...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-13",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 19,
        "title": "Debunking Myths About Indian Diet - A Dietitian's Perspective",
        "slug": "debunking-myths-about-indian-diet---a-dietitians-perspective",
        "category": "Weight Loss",
        "meta_description": "Learn debunking myths about indian diet - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get the best indian diet diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about indian diet - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-02",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 20,
        "title": "Debunking Myths About Metabolism",
        "slug": "debunking-myths-about-metabolism",
        "category": "Weight Loss",
        "meta_description": "Learn debunking myths about metabolism with expert clinical nutritionist Oshin Ambekar. Get the best metabolism diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about metabolism with expert clinical nutritionist Oshin Ambekar. Get the best metabolism diet pla...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-03",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 21,
        "title": "The Best Diet for Blood Sugar with Indian Food",
        "slug": "the-best-diet-for-blood-sugar-with-indian-food",
        "category": "Diabetes",
        "meta_description": "Learn the best diet for blood sugar with indian food with expert clinical nutritionist Oshin Ambekar. Get the best blood sugar diet plans in Indore and online.",
        "excerpt": "Learn the best diet for blood sugar with indian food with expert clinical nutritionist Oshin Ambekar. Get the best blood...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Blood Sugar</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Blood Sugar Matters</h2>
        <p>When it comes to blood sugar, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized blood sugar plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-09",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 22,
        "title": "Debunking Myths About Sugar Free Without Starving",
        "slug": "debunking-myths-about-sugar-free-without-starving",
        "category": "Diabetes",
        "meta_description": "Learn debunking myths about sugar free without starving with expert clinical nutritionist Oshin Ambekar. Get the best sugar free diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about sugar free without starving with expert clinical nutritionist Oshin Ambekar. Get the best su...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Sugar Free</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Sugar Free Matters</h2>
        <p>When it comes to sugar free, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized sugar free plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-07",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 23,
        "title": "5 Proven Tips for Diabetic Diet in 2026",
        "slug": "5-proven-tips-for-diabetic-diet-in-2026",
        "category": "Diabetes",
        "meta_description": "Learn 5 proven tips for diabetic diet in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best diabetic diet diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for diabetic diet in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best diabetic die...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Diabetic Diet</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Diabetic Diet Matters</h2>
        <p>When it comes to diabetic diet, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized diabetic diet plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 24,
        "title": "The Ultimate Guide to Type 2 Diabetes for Busy Professionals",
        "slug": "the-ultimate-guide-to-type-2-diabetes-for-busy-professionals",
        "category": "Diabetes",
        "meta_description": "Learn the ultimate guide to type 2 diabetes for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best type 2 diabetes diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to type 2 diabetes for busy professionals with expert clinical nutritionist Oshin Ambekar. Get ...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Type 2 Diabetes</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Type 2 Diabetes Matters</h2>
        <p>When it comes to type 2 diabetes, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized type 2 diabetes plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-07",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 25,
        "title": "Nutrislims Guide to HbA1c",
        "slug": "nutrislims-guide-to-hba1c",
        "category": "Diabetes",
        "meta_description": "Learn nutrislims guide to hba1c with expert clinical nutritionist Oshin Ambekar. Get the best hba1c diet plans in Indore and online.",
        "excerpt": "Learn nutrislims guide to hba1c with expert clinical nutritionist Oshin Ambekar. Get the best hba1c diet plans in Indore...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>HbA1c</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why HbA1c Matters</h2>
        <p>When it comes to hba1c, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized hba1c plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-01",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 26,
        "title": "Expert Advice on Insulin Resistance",
        "slug": "expert-advice-on-insulin-resistance",
        "category": "Diabetes",
        "meta_description": "Learn expert advice on insulin resistance with expert clinical nutritionist Oshin Ambekar. Get the best insulin resistance diet plans in Indore and online.",
        "excerpt": "Learn expert advice on insulin resistance with expert clinical nutritionist Oshin Ambekar. Get the best insulin resistan...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-13",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 27,
        "title": "Debunking Myths About Type 2 Diabetes",
        "slug": "debunking-myths-about-type-2-diabetes",
        "category": "Diabetes",
        "meta_description": "Learn debunking myths about type 2 diabetes with expert clinical nutritionist Oshin Ambekar. Get the best type 2 diabetes diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about type 2 diabetes with expert clinical nutritionist Oshin Ambekar. Get the best type 2 diabete...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-10",
        "read_time": "7 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 28,
        "title": "5 Proven Tips for Diabetes Management",
        "slug": "5-proven-tips-for-diabetes-management",
        "category": "Diabetes",
        "meta_description": "Learn 5 proven tips for diabetes management with expert clinical nutritionist Oshin Ambekar. Get the best diabetes management diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for diabetes management with expert clinical nutritionist Oshin Ambekar. Get the best diabetes manag...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-04",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 29,
        "title": "How to Manage Low Glycemic Without Starving",
        "slug": "how-to-manage-low-glycemic-without-starving",
        "category": "Diabetes",
        "meta_description": "Learn how to manage low glycemic without starving with expert clinical nutritionist Oshin Ambekar. Get the best low glycemic diet plans in Indore and online.",
        "excerpt": "Learn how to manage low glycemic without starving with expert clinical nutritionist Oshin Ambekar. Get the best low glyc...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-07",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 30,
        "title": "Expert Advice on Diabetes Management Backed by Science",
        "slug": "expert-advice-on-diabetes-management-backed-by-science",
        "category": "Diabetes",
        "meta_description": "Learn expert advice on diabetes management backed by science with expert clinical nutritionist Oshin Ambekar. Get the best diabetes management diet plans in Indore and online.",
        "excerpt": "Learn expert advice on diabetes management backed by science with expert clinical nutritionist Oshin Ambekar. Get the be...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-11",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 31,
        "title": "The Ultimate Guide to Low Glycemic with Indian Food",
        "slug": "the-ultimate-guide-to-low-glycemic-with-indian-food",
        "category": "Diabetes",
        "meta_description": "Learn the ultimate guide to low glycemic with indian food with expert clinical nutritionist Oshin Ambekar. Get the best low glycemic diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to low glycemic with indian food with expert clinical nutritionist Oshin Ambekar. Get the best ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-07",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 32,
        "title": "How to Manage Blood Sugar",
        "slug": "how-to-manage-blood-sugar",
        "category": "Diabetes",
        "meta_description": "Learn how to manage blood sugar with expert clinical nutritionist Oshin Ambekar. Get the best blood sugar diet plans in Indore and online.",
        "excerpt": "Learn how to manage blood sugar with expert clinical nutritionist Oshin Ambekar. Get the best blood sugar diet plans in ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-13",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 33,
        "title": "Debunking Myths About HbA1c Backed by Science",
        "slug": "debunking-myths-about-hba1c-backed-by-science",
        "category": "Diabetes",
        "meta_description": "Learn debunking myths about hba1c backed by science with expert clinical nutritionist Oshin Ambekar. Get the best hba1c diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about hba1c backed by science with expert clinical nutritionist Oshin Ambekar. Get the best hba1c ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 34,
        "title": "Top Foods for Low Glycemic Naturally",
        "slug": "top-foods-for-low-glycemic-naturally",
        "category": "Diabetes",
        "meta_description": "Learn top foods for low glycemic naturally with expert clinical nutritionist Oshin Ambekar. Get the best low glycemic diet plans in Indore and online.",
        "excerpt": "Learn top foods for low glycemic naturally with expert clinical nutritionist Oshin Ambekar. Get the best low glycemic di...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-09",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 35,
        "title": "The Best Diet for Insulin Resistance",
        "slug": "the-best-diet-for-insulin-resistance",
        "category": "Diabetes",
        "meta_description": "Learn the best diet for insulin resistance with expert clinical nutritionist Oshin Ambekar. Get the best insulin resistance diet plans in Indore and online.",
        "excerpt": "Learn the best diet for insulin resistance with expert clinical nutritionist Oshin Ambekar. Get the best insulin resista...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 36,
        "title": "The Best Diet for Diabetic Diet",
        "slug": "the-best-diet-for-diabetic-diet",
        "category": "Diabetes",
        "meta_description": "Learn the best diet for diabetic diet with expert clinical nutritionist Oshin Ambekar. Get the best diabetic diet diet plans in Indore and online.",
        "excerpt": "Learn the best diet for diabetic diet with expert clinical nutritionist Oshin Ambekar. Get the best diabetic diet diet p...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-10",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 37,
        "title": "Nutrislims Guide to Insulin Resistance with Indian Food",
        "slug": "nutrislims-guide-to-insulin-resistance-with-indian-food",
        "category": "Diabetes",
        "meta_description": "Learn nutrislims guide to insulin resistance with indian food with expert clinical nutritionist Oshin Ambekar. Get the best insulin resistance diet plans in Indore and online.",
        "excerpt": "Learn nutrislims guide to insulin resistance with indian food with expert clinical nutritionist Oshin Ambekar. Get the b...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 38,
        "title": "5 Proven Tips for HbA1c Backed by Science",
        "slug": "5-proven-tips-for-hba1c-backed-by-science",
        "category": "Diabetes",
        "meta_description": "Learn 5 proven tips for hba1c backed by science with expert clinical nutritionist Oshin Ambekar. Get the best hba1c diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for hba1c backed by science with expert clinical nutritionist Oshin Ambekar. Get the best hba1c diet...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-07",
        "read_time": "7 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 39,
        "title": "Expert Advice on Low Glycemic Without Starving",
        "slug": "expert-advice-on-low-glycemic-without-starving",
        "category": "Diabetes",
        "meta_description": "Learn expert advice on low glycemic without starving with expert clinical nutritionist Oshin Ambekar. Get the best low glycemic diet plans in Indore and online.",
        "excerpt": "Learn expert advice on low glycemic without starving with expert clinical nutritionist Oshin Ambekar. Get the best low g...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 40,
        "title": "Understanding Sugar Free Naturally",
        "slug": "understanding-sugar-free-naturally",
        "category": "Diabetes",
        "meta_description": "Learn understanding sugar free naturally with expert clinical nutritionist Oshin Ambekar. Get the best sugar free diet plans in Indore and online.",
        "excerpt": "Learn understanding sugar free naturally with expert clinical nutritionist Oshin Ambekar. Get the best sugar free diet p...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-01",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 41,
        "title": "The Ultimate Guide to Seed Cycling Naturally",
        "slug": "the-ultimate-guide-to-seed-cycling-naturally",
        "category": "PCOS",
        "meta_description": "Learn the ultimate guide to seed cycling naturally with expert clinical nutritionist Oshin Ambekar. Get the best seed cycling diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to seed cycling naturally with expert clinical nutritionist Oshin Ambekar. Get the best seed cy...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Seed Cycling</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Seed Cycling Matters</h2>
        <p>When it comes to seed cycling, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized seed cycling plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-04",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 42,
        "title": "Nutrislims Guide to PCOS Weight Loss Backed by Science",
        "slug": "nutrislims-guide-to-pcos-weight-loss-backed-by-science",
        "category": "PCOS",
        "meta_description": "Learn nutrislims guide to pcos weight loss backed by science with expert clinical nutritionist Oshin Ambekar. Get the best pcos weight loss diet plans in Indore and online.",
        "excerpt": "Learn nutrislims guide to pcos weight loss backed by science with expert clinical nutritionist Oshin Ambekar. Get the be...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>PCOS Weight Loss</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why PCOS Weight Loss Matters</h2>
        <p>When it comes to pcos weight loss, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized pcos weight loss plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-09",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 43,
        "title": "5 Proven Tips for Anti-inflammatory Backed by Science",
        "slug": "5-proven-tips-for-anti-inflammatory-backed-by-science",
        "category": "PCOS",
        "meta_description": "Learn 5 proven tips for anti-inflammatory backed by science with expert clinical nutritionist Oshin Ambekar. Get the best anti-inflammatory diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for anti-inflammatory backed by science with expert clinical nutritionist Oshin Ambekar. Get the bes...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Anti-inflammatory</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Anti-inflammatory Matters</h2>
        <p>When it comes to anti-inflammatory, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized anti-inflammatory plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-05",
        "read_time": "7 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 44,
        "title": "Top Foods for PCOS Diet at Home",
        "slug": "top-foods-for-pcos-diet-at-home",
        "category": "PCOS",
        "meta_description": "Learn top foods for pcos diet at home with expert clinical nutritionist Oshin Ambekar. Get the best pcos diet diet plans in Indore and online.",
        "excerpt": "Learn top foods for pcos diet at home with expert clinical nutritionist Oshin Ambekar. Get the best pcos diet diet plans...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>PCOS Diet</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why PCOS Diet Matters</h2>
        <p>When it comes to pcos diet, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized pcos diet plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-06",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 45,
        "title": "Understanding Seed Cycling",
        "slug": "understanding-seed-cycling",
        "category": "PCOS",
        "meta_description": "Learn understanding seed cycling with expert clinical nutritionist Oshin Ambekar. Get the best seed cycling diet plans in Indore and online.",
        "excerpt": "Learn understanding seed cycling with expert clinical nutritionist Oshin Ambekar. Get the best seed cycling diet plans i...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Seed Cycling</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Seed Cycling Matters</h2>
        <p>When it comes to seed cycling, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized seed cycling plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-11",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 46,
        "title": "The Best Diet for Women's Health Naturally",
        "slug": "the-best-diet-for-womens-health-naturally",
        "category": "PCOS",
        "meta_description": "Learn the best diet for women's health naturally with expert clinical nutritionist Oshin Ambekar. Get the best women's health diet plans in Indore and online.",
        "excerpt": "Learn the best diet for women's health naturally with expert clinical nutritionist Oshin Ambekar. Get the best women's h...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-13",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 47,
        "title": "Understanding Insulin PCOS",
        "slug": "understanding-insulin-pcos",
        "category": "PCOS",
        "meta_description": "Learn understanding insulin pcos with expert clinical nutritionist Oshin Ambekar. Get the best insulin pcos diet plans in Indore and online.",
        "excerpt": "Learn understanding insulin pcos with expert clinical nutritionist Oshin Ambekar. Get the best insulin pcos diet plans i...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-05",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 48,
        "title": "Understanding Hormonal Imbalance",
        "slug": "understanding-hormonal-imbalance",
        "category": "PCOS",
        "meta_description": "Learn understanding hormonal imbalance with expert clinical nutritionist Oshin Ambekar. Get the best hormonal imbalance diet plans in Indore and online.",
        "excerpt": "Learn understanding hormonal imbalance with expert clinical nutritionist Oshin Ambekar. Get the best hormonal imbalance ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-04",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 49,
        "title": "How to Manage Seed Cycling Backed by Science",
        "slug": "how-to-manage-seed-cycling-backed-by-science",
        "category": "PCOS",
        "meta_description": "Learn how to manage seed cycling backed by science with expert clinical nutritionist Oshin Ambekar. Get the best seed cycling diet plans in Indore and online.",
        "excerpt": "Learn how to manage seed cycling backed by science with expert clinical nutritionist Oshin Ambekar. Get the best seed cy...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-06",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 50,
        "title": "Nutrislims Guide to Insulin PCOS Naturally",
        "slug": "nutrislims-guide-to-insulin-pcos-naturally",
        "category": "PCOS",
        "meta_description": "Learn nutrislims guide to insulin pcos naturally with expert clinical nutritionist Oshin Ambekar. Get the best insulin pcos diet plans in Indore and online.",
        "excerpt": "Learn nutrislims guide to insulin pcos naturally with expert clinical nutritionist Oshin Ambekar. Get the best insulin p...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-08",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 51,
        "title": "Debunking Myths About Hormonal Imbalance Without Starving",
        "slug": "debunking-myths-about-hormonal-imbalance-without-starving",
        "category": "PCOS",
        "meta_description": "Learn debunking myths about hormonal imbalance without starving with expert clinical nutritionist Oshin Ambekar. Get the best hormonal imbalance diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about hormonal imbalance without starving with expert clinical nutritionist Oshin Ambekar. Get the...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-05",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 52,
        "title": "The Best Diet for Anti-inflammatory",
        "slug": "the-best-diet-for-anti-inflammatory",
        "category": "PCOS",
        "meta_description": "Learn the best diet for anti-inflammatory with expert clinical nutritionist Oshin Ambekar. Get the best anti-inflammatory diet plans in Indore and online.",
        "excerpt": "Learn the best diet for anti-inflammatory with expert clinical nutritionist Oshin Ambekar. Get the best anti-inflammator...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-03",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 53,
        "title": "How to Manage Hormonal Imbalance for Busy Professionals",
        "slug": "how-to-manage-hormonal-imbalance-for-busy-professionals",
        "category": "PCOS",
        "meta_description": "Learn how to manage hormonal imbalance for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best hormonal imbalance diet plans in Indore and online.",
        "excerpt": "Learn how to manage hormonal imbalance for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the b...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-05",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 54,
        "title": "The Ultimate Guide to Hormonal Imbalance",
        "slug": "the-ultimate-guide-to-hormonal-imbalance",
        "category": "PCOS",
        "meta_description": "Learn the ultimate guide to hormonal imbalance with expert clinical nutritionist Oshin Ambekar. Get the best hormonal imbalance diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to hormonal imbalance with expert clinical nutritionist Oshin Ambekar. Get the best hormonal im...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-09",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 55,
        "title": "Debunking Myths About PCOS Diet at Home",
        "slug": "debunking-myths-about-pcos-diet-at-home",
        "category": "PCOS",
        "meta_description": "Learn debunking myths about pcos diet at home with expert clinical nutritionist Oshin Ambekar. Get the best pcos diet diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about pcos diet at home with expert clinical nutritionist Oshin Ambekar. Get the best pcos diet di...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-07",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 56,
        "title": "A Clinical Approach to Insulin PCOS for Busy Professionals",
        "slug": "a-clinical-approach-to-insulin-pcos-for-busy-professionals",
        "category": "PCOS",
        "meta_description": "Learn a clinical approach to insulin pcos for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best insulin pcos diet plans in Indore and online.",
        "excerpt": "Learn a clinical approach to insulin pcos for busy professionals with expert clinical nutritionist Oshin Ambekar. Get th...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-01",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 57,
        "title": "Understanding Hormonal Imbalance",
        "slug": "understanding-hormonal-imbalance",
        "category": "PCOS",
        "meta_description": "Learn understanding hormonal imbalance with expert clinical nutritionist Oshin Ambekar. Get the best hormonal imbalance diet plans in Indore and online.",
        "excerpt": "Learn understanding hormonal imbalance with expert clinical nutritionist Oshin Ambekar. Get the best hormonal imbalance ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-09",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 58,
        "title": "Expert Advice on Insulin PCOS Without Starving",
        "slug": "expert-advice-on-insulin-pcos-without-starving",
        "category": "PCOS",
        "meta_description": "Learn expert advice on insulin pcos without starving with expert clinical nutritionist Oshin Ambekar. Get the best insulin pcos diet plans in Indore and online.",
        "excerpt": "Learn expert advice on insulin pcos without starving with expert clinical nutritionist Oshin Ambekar. Get the best insul...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 59,
        "title": "Expert Advice on Seed Cycling with Indian Food",
        "slug": "expert-advice-on-seed-cycling-with-indian-food",
        "category": "PCOS",
        "meta_description": "Learn expert advice on seed cycling with indian food with expert clinical nutritionist Oshin Ambekar. Get the best seed cycling diet plans in Indore and online.",
        "excerpt": "Learn expert advice on seed cycling with indian food with expert clinical nutritionist Oshin Ambekar. Get the best seed ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-05",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 60,
        "title": "Expert Advice on PCOS Diet in 2026",
        "slug": "expert-advice-on-pcos-diet-in-2026",
        "category": "PCOS",
        "meta_description": "Learn expert advice on pcos diet in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best pcos diet diet plans in Indore and online.",
        "excerpt": "Learn expert advice on pcos diet in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best pcos diet diet pl...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-14",
        "read_time": "7 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 61,
        "title": "The Best Diet for Kids Diet",
        "slug": "the-best-diet-for-kids-diet",
        "category": "Child Nutrition",
        "meta_description": "Learn the best diet for kids diet with expert clinical nutritionist Oshin Ambekar. Get the best kids diet diet plans in Indore and online.",
        "excerpt": "Learn the best diet for kids diet with expert clinical nutritionist Oshin Ambekar. Get the best kids diet diet plans in ...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Kids Diet</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Kids Diet Matters</h2>
        <p>When it comes to kids diet, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized kids diet plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-04",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 62,
        "title": "Top Foods for Healthy Growth - A Dietitian's Perspective",
        "slug": "top-foods-for-healthy-growth---a-dietitians-perspective",
        "category": "Child Nutrition",
        "meta_description": "Learn top foods for healthy growth - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get the best healthy growth diet plans in Indore and online.",
        "excerpt": "Learn top foods for healthy growth - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get the ...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Healthy Growth</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Healthy Growth Matters</h2>
        <p>When it comes to healthy growth, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized healthy growth plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-10",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 63,
        "title": "Understanding Teen Nutrition at Home",
        "slug": "understanding-teen-nutrition-at-home",
        "category": "Child Nutrition",
        "meta_description": "Learn understanding teen nutrition at home with expert clinical nutritionist Oshin Ambekar. Get the best teen nutrition diet plans in Indore and online.",
        "excerpt": "Learn understanding teen nutrition at home with expert clinical nutritionist Oshin Ambekar. Get the best teen nutrition ...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Teen Nutrition</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Teen Nutrition Matters</h2>
        <p>When it comes to teen nutrition, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized teen nutrition plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-07",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 64,
        "title": "5 Proven Tips for Healthy Growth",
        "slug": "5-proven-tips-for-healthy-growth",
        "category": "Child Nutrition",
        "meta_description": "Learn 5 proven tips for healthy growth with expert clinical nutritionist Oshin Ambekar. Get the best healthy growth diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for healthy growth with expert clinical nutritionist Oshin Ambekar. Get the best healthy growth diet...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Healthy Growth</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Healthy Growth Matters</h2>
        <p>When it comes to healthy growth, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized healthy growth plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-11",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 65,
        "title": "A Clinical Approach to Teen Nutrition with Indian Food",
        "slug": "a-clinical-approach-to-teen-nutrition-with-indian-food",
        "category": "Child Nutrition",
        "meta_description": "Learn a clinical approach to teen nutrition with indian food with expert clinical nutritionist Oshin Ambekar. Get the best teen nutrition diet plans in Indore and online.",
        "excerpt": "Learn a clinical approach to teen nutrition with indian food with expert clinical nutritionist Oshin Ambekar. Get the be...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Teen Nutrition</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Teen Nutrition Matters</h2>
        <p>When it comes to teen nutrition, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized teen nutrition plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-14",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 66,
        "title": "Top Foods for School Lunch Ideas Without Starving",
        "slug": "top-foods-for-school-lunch-ideas-without-starving",
        "category": "Child Nutrition",
        "meta_description": "Learn top foods for school lunch ideas without starving with expert clinical nutritionist Oshin Ambekar. Get the best school lunch ideas diet plans in Indore and online.",
        "excerpt": "Learn top foods for school lunch ideas without starving with expert clinical nutritionist Oshin Ambekar. Get the best sc...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-01",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 67,
        "title": "Debunking Myths About School Lunch Ideas",
        "slug": "debunking-myths-about-school-lunch-ideas",
        "category": "Child Nutrition",
        "meta_description": "Learn debunking myths about school lunch ideas with expert clinical nutritionist Oshin Ambekar. Get the best school lunch ideas diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about school lunch ideas with expert clinical nutritionist Oshin Ambekar. Get the best school lunc...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-04",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 68,
        "title": "A Clinical Approach to Healthy Growth - A Dietitian's Perspective",
        "slug": "a-clinical-approach-to-healthy-growth---a-dietitians-perspective",
        "category": "Child Nutrition",
        "meta_description": "Learn a clinical approach to healthy growth - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get the best healthy growth diet plans in Indore and online.",
        "excerpt": "Learn a clinical approach to healthy growth - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar....",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-13",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 69,
        "title": "A Clinical Approach to Child Nutrition in 2026",
        "slug": "a-clinical-approach-to-child-nutrition-in-2026",
        "category": "Child Nutrition",
        "meta_description": "Learn a clinical approach to child nutrition in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best child nutrition diet plans in Indore and online.",
        "excerpt": "Learn a clinical approach to child nutrition in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best child...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-13",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 70,
        "title": "The Best Diet for Picky Eaters for Busy Professionals",
        "slug": "the-best-diet-for-picky-eaters-for-busy-professionals",
        "category": "Child Nutrition",
        "meta_description": "Learn the best diet for picky eaters for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best picky eaters diet plans in Indore and online.",
        "excerpt": "Learn the best diet for picky eaters for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the bes...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-10",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 71,
        "title": "Debunking Myths About Kids Diet Naturally",
        "slug": "debunking-myths-about-kids-diet-naturally",
        "category": "Child Nutrition",
        "meta_description": "Learn debunking myths about kids diet naturally with expert clinical nutritionist Oshin Ambekar. Get the best kids diet diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about kids diet naturally with expert clinical nutritionist Oshin Ambekar. Get the best kids diet ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-07",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 72,
        "title": "Expert Advice on Kids Diet with Indian Food",
        "slug": "expert-advice-on-kids-diet-with-indian-food",
        "category": "Child Nutrition",
        "meta_description": "Learn expert advice on kids diet with indian food with expert clinical nutritionist Oshin Ambekar. Get the best kids diet diet plans in Indore and online.",
        "excerpt": "Learn expert advice on kids diet with indian food with expert clinical nutritionist Oshin Ambekar. Get the best kids die...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-11",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 73,
        "title": "5 Proven Tips for Immunity for Kids Backed by Science",
        "slug": "5-proven-tips-for-immunity-for-kids-backed-by-science",
        "category": "Child Nutrition",
        "meta_description": "Learn 5 proven tips for immunity for kids backed by science with expert clinical nutritionist Oshin Ambekar. Get the best immunity for kids diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for immunity for kids backed by science with expert clinical nutritionist Oshin Ambekar. Get the bes...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-14",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 74,
        "title": "Expert Advice on Immunity for Kids Backed by Science",
        "slug": "expert-advice-on-immunity-for-kids-backed-by-science",
        "category": "Child Nutrition",
        "meta_description": "Learn expert advice on immunity for kids backed by science with expert clinical nutritionist Oshin Ambekar. Get the best immunity for kids diet plans in Indore and online.",
        "excerpt": "Learn expert advice on immunity for kids backed by science with expert clinical nutritionist Oshin Ambekar. Get the best...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-11",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 75,
        "title": "Nutrislims Guide to Picky Eaters - A Dietitian's Perspective",
        "slug": "nutrislims-guide-to-picky-eaters---a-dietitians-perspective",
        "category": "Child Nutrition",
        "meta_description": "Learn nutrislims guide to picky eaters - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get the best picky eaters diet plans in Indore and online.",
        "excerpt": "Learn nutrislims guide to picky eaters - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-04",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 76,
        "title": "Expert Advice on Immunity for Kids",
        "slug": "expert-advice-on-immunity-for-kids",
        "category": "Child Nutrition",
        "meta_description": "Learn expert advice on immunity for kids with expert clinical nutritionist Oshin Ambekar. Get the best immunity for kids diet plans in Indore and online.",
        "excerpt": "Learn expert advice on immunity for kids with expert clinical nutritionist Oshin Ambekar. Get the best immunity for kids...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-09",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 77,
        "title": "Understanding Healthy Growth for Busy Professionals",
        "slug": "understanding-healthy-growth-for-busy-professionals",
        "category": "Child Nutrition",
        "meta_description": "Learn understanding healthy growth for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best healthy growth diet plans in Indore and online.",
        "excerpt": "Learn understanding healthy growth for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-02",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 78,
        "title": "The Best Diet for Picky Eaters",
        "slug": "the-best-diet-for-picky-eaters",
        "category": "Child Nutrition",
        "meta_description": "Learn the best diet for picky eaters with expert clinical nutritionist Oshin Ambekar. Get the best picky eaters diet plans in Indore and online.",
        "excerpt": "Learn the best diet for picky eaters with expert clinical nutritionist Oshin Ambekar. Get the best picky eaters diet pla...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-08",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 79,
        "title": "Expert Advice on Teen Nutrition",
        "slug": "expert-advice-on-teen-nutrition",
        "category": "Child Nutrition",
        "meta_description": "Learn expert advice on teen nutrition with expert clinical nutritionist Oshin Ambekar. Get the best teen nutrition diet plans in Indore and online.",
        "excerpt": "Learn expert advice on teen nutrition with expert clinical nutritionist Oshin Ambekar. Get the best teen nutrition diet ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-04",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 80,
        "title": "The Ultimate Guide to Brain Food at Home",
        "slug": "the-ultimate-guide-to-brain-food-at-home",
        "category": "Child Nutrition",
        "meta_description": "Learn the ultimate guide to brain food at home with expert clinical nutritionist Oshin Ambekar. Get the best brain food diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to brain food at home with expert clinical nutritionist Oshin Ambekar. Get the best brain food ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-08",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 81,
        "title": "Expert Advice on Trimester Diet in 2026",
        "slug": "expert-advice-on-trimester-diet-in-2026",
        "category": "Pregnancy",
        "meta_description": "Learn expert advice on trimester diet in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best trimester diet diet plans in Indore and online.",
        "excerpt": "Learn expert advice on trimester diet in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best trimester di...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Trimester Diet</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Trimester Diet Matters</h2>
        <p>When it comes to trimester diet, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized trimester diet plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-08",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 82,
        "title": "Understanding Postpartum Weight Loss Backed by Science",
        "slug": "understanding-postpartum-weight-loss-backed-by-science",
        "category": "Pregnancy",
        "meta_description": "Learn understanding postpartum weight loss backed by science with expert clinical nutritionist Oshin Ambekar. Get the best postpartum weight loss diet plans in Indore and online.",
        "excerpt": "Learn understanding postpartum weight loss backed by science with expert clinical nutritionist Oshin Ambekar. Get the be...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Postpartum Weight Loss</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Postpartum Weight Loss Matters</h2>
        <p>When it comes to postpartum weight loss, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized postpartum weight loss plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-14",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 83,
        "title": "The Ultimate Guide to Healthy Pregnancy - A Dietitian's Perspective",
        "slug": "the-ultimate-guide-to-healthy-pregnancy---a-dietitians-perspective",
        "category": "Pregnancy",
        "meta_description": "Learn the ultimate guide to healthy pregnancy - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get the best healthy pregnancy diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to healthy pregnancy - a dietitian's perspective with expert clinical nutritionist Oshin Ambeka...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Healthy Pregnancy</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Healthy Pregnancy Matters</h2>
        <p>When it comes to healthy pregnancy, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized healthy pregnancy plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-04",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 84,
        "title": "A Clinical Approach to Folate Rich Foods",
        "slug": "a-clinical-approach-to-folate-rich-foods",
        "category": "Pregnancy",
        "meta_description": "Learn a clinical approach to folate rich foods with expert clinical nutritionist Oshin Ambekar. Get the best folate rich foods diet plans in Indore and online.",
        "excerpt": "Learn a clinical approach to folate rich foods with expert clinical nutritionist Oshin Ambekar. Get the best folate rich...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Folate Rich Foods</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Folate Rich Foods Matters</h2>
        <p>When it comes to folate rich foods, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized folate rich foods plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-11",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 85,
        "title": "The Best Diet for Trimester Diet",
        "slug": "the-best-diet-for-trimester-diet",
        "category": "Pregnancy",
        "meta_description": "Learn the best diet for trimester diet with expert clinical nutritionist Oshin Ambekar. Get the best trimester diet diet plans in Indore and online.",
        "excerpt": "Learn the best diet for trimester diet with expert clinical nutritionist Oshin Ambekar. Get the best trimester diet diet...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Trimester Diet</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Trimester Diet Matters</h2>
        <p>When it comes to trimester diet, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized trimester diet plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-05",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 86,
        "title": "Understanding Prenatal Nutrition for Busy Professionals",
        "slug": "understanding-prenatal-nutrition-for-busy-professionals",
        "category": "Pregnancy",
        "meta_description": "Learn understanding prenatal nutrition for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best prenatal nutrition diet plans in Indore and online.",
        "excerpt": "Learn understanding prenatal nutrition for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the b...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-10",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 87,
        "title": "Debunking Myths About Folate Rich Foods for Busy Professionals",
        "slug": "debunking-myths-about-folate-rich-foods-for-busy-professionals",
        "category": "Pregnancy",
        "meta_description": "Learn debunking myths about folate rich foods for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best folate rich foods diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about folate rich foods for busy professionals with expert clinical nutritionist Oshin Ambekar. Ge...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-03",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 88,
        "title": "Debunking Myths About Folate Rich Foods - A Dietitian's Perspective",
        "slug": "debunking-myths-about-folate-rich-foods---a-dietitians-perspective",
        "category": "Pregnancy",
        "meta_description": "Learn debunking myths about folate rich foods - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get the best folate rich foods diet plans in Indore and online.",
        "excerpt": "Learn debunking myths about folate rich foods - a dietitian's perspective with expert clinical nutritionist Oshin Ambeka...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-14",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 89,
        "title": "Expert Advice on Gestational Diabetes with Indian Food",
        "slug": "expert-advice-on-gestational-diabetes-with-indian-food",
        "category": "Pregnancy",
        "meta_description": "Learn expert advice on gestational diabetes with indian food with expert clinical nutritionist Oshin Ambekar. Get the best gestational diabetes diet plans in Indore and online.",
        "excerpt": "Learn expert advice on gestational diabetes with indian food with expert clinical nutritionist Oshin Ambekar. Get the be...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-03",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 90,
        "title": "A Clinical Approach to Gestational Diabetes",
        "slug": "a-clinical-approach-to-gestational-diabetes",
        "category": "Pregnancy",
        "meta_description": "Learn a clinical approach to gestational diabetes with expert clinical nutritionist Oshin Ambekar. Get the best gestational diabetes diet plans in Indore and online.",
        "excerpt": "Learn a clinical approach to gestational diabetes with expert clinical nutritionist Oshin Ambekar. Get the best gestatio...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-13",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 91,
        "title": "The Ultimate Guide to Folate Rich Foods",
        "slug": "the-ultimate-guide-to-folate-rich-foods",
        "category": "Pregnancy",
        "meta_description": "Learn the ultimate guide to folate rich foods with expert clinical nutritionist Oshin Ambekar. Get the best folate rich foods diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to folate rich foods with expert clinical nutritionist Oshin Ambekar. Get the best folate rich ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-08",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 92,
        "title": "5 Proven Tips for Folate Rich Foods in 2026",
        "slug": "5-proven-tips-for-folate-rich-foods-in-2026",
        "category": "Pregnancy",
        "meta_description": "Learn 5 proven tips for folate rich foods in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best folate rich foods diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for folate rich foods in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best folate r...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-04",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 93,
        "title": "Expert Advice on Postpartum Weight Loss Without Starving",
        "slug": "expert-advice-on-postpartum-weight-loss-without-starving",
        "category": "Pregnancy",
        "meta_description": "Learn expert advice on postpartum weight loss without starving with expert clinical nutritionist Oshin Ambekar. Get the best postpartum weight loss diet plans in Indore and online.",
        "excerpt": "Learn expert advice on postpartum weight loss without starving with expert clinical nutritionist Oshin Ambekar. Get the ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-05",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 94,
        "title": "A Clinical Approach to Breastfeeding Diet for Busy Professionals",
        "slug": "a-clinical-approach-to-breastfeeding-diet-for-busy-professionals",
        "category": "Pregnancy",
        "meta_description": "Learn a clinical approach to breastfeeding diet for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best breastfeeding diet diet plans in Indore and online.",
        "excerpt": "Learn a clinical approach to breastfeeding diet for busy professionals with expert clinical nutritionist Oshin Ambekar. ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-06",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 95,
        "title": "5 Proven Tips for Pregnancy Diet for Busy Professionals",
        "slug": "5-proven-tips-for-pregnancy-diet-for-busy-professionals",
        "category": "Pregnancy",
        "meta_description": "Learn 5 proven tips for pregnancy diet for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best pregnancy diet diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for pregnancy diet for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the b...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 96,
        "title": "The Best Diet for Prenatal Nutrition in 2026",
        "slug": "the-best-diet-for-prenatal-nutrition-in-2026",
        "category": "Pregnancy",
        "meta_description": "Learn the best diet for prenatal nutrition in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best prenatal nutrition diet plans in Indore and online.",
        "excerpt": "Learn the best diet for prenatal nutrition in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best prenata...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 97,
        "title": "Top Foods for Healthy Pregnancy Naturally",
        "slug": "top-foods-for-healthy-pregnancy-naturally",
        "category": "Pregnancy",
        "meta_description": "Learn top foods for healthy pregnancy naturally with expert clinical nutritionist Oshin Ambekar. Get the best healthy pregnancy diet plans in Indore and online.",
        "excerpt": "Learn top foods for healthy pregnancy naturally with expert clinical nutritionist Oshin Ambekar. Get the best healthy pr...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 98,
        "title": "The Best Diet for Postpartum Weight Loss in 2026",
        "slug": "the-best-diet-for-postpartum-weight-loss-in-2026",
        "category": "Pregnancy",
        "meta_description": "Learn the best diet for postpartum weight loss in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best postpartum weight loss diet plans in Indore and online.",
        "excerpt": "Learn the best diet for postpartum weight loss in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best pos...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 99,
        "title": "The Best Diet for Breastfeeding Diet",
        "slug": "the-best-diet-for-breastfeeding-diet",
        "category": "Pregnancy",
        "meta_description": "Learn the best diet for breastfeeding diet with expert clinical nutritionist Oshin Ambekar. Get the best breastfeeding diet diet plans in Indore and online.",
        "excerpt": "Learn the best diet for breastfeeding diet with expert clinical nutritionist Oshin Ambekar. Get the best breastfeeding d...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-01",
        "read_time": "7 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 100,
        "title": "5 Proven Tips for Folate Rich Foods - A Dietitian's Perspective",
        "slug": "5-proven-tips-for-folate-rich-foods---a-dietitians-perspective",
        "category": "Pregnancy",
        "meta_description": "Learn 5 proven tips for folate rich foods - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get the best folate rich foods diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for folate rich foods - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. G...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-06",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 101,
        "title": "The Best Diet for Stress Management for Busy Professionals",
        "slug": "the-best-diet-for-stress-management-for-busy-professionals",
        "category": "Corporate Wellness",
        "meta_description": "Learn the best diet for stress management for busy professionals with expert clinical nutritionist Oshin Ambekar. Get the best stress management diet plans in Indore and online.",
        "excerpt": "Learn the best diet for stress management for busy professionals with expert clinical nutritionist Oshin Ambekar. Get th...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Stress Management</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Stress Management Matters</h2>
        <p>When it comes to stress management, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized stress management plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-10",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 102,
        "title": "5 Proven Tips for Quick Healthy Meals Backed by Science",
        "slug": "5-proven-tips-for-quick-healthy-meals-backed-by-science",
        "category": "Corporate Wellness",
        "meta_description": "Learn 5 proven tips for quick healthy meals backed by science with expert clinical nutritionist Oshin Ambekar. Get the best quick healthy meals diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for quick healthy meals backed by science with expert clinical nutritionist Oshin Ambekar. Get the b...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Quick Healthy Meals</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Quick Healthy Meals Matters</h2>
        <p>When it comes to quick healthy meals, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized quick healthy meals plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-05",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 103,
        "title": "The Ultimate Guide to Quick Healthy Meals Backed by Science",
        "slug": "the-ultimate-guide-to-quick-healthy-meals-backed-by-science",
        "category": "Corporate Wellness",
        "meta_description": "Learn the ultimate guide to quick healthy meals backed by science with expert clinical nutritionist Oshin Ambekar. Get the best quick healthy meals diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to quick healthy meals backed by science with expert clinical nutritionist Oshin Ambekar. Get t...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Quick Healthy Meals</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Quick Healthy Meals Matters</h2>
        <p>When it comes to quick healthy meals, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized quick healthy meals plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-04",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 104,
        "title": "The Ultimate Guide to Ergonomics at Home",
        "slug": "the-ultimate-guide-to-ergonomics-at-home",
        "category": "Corporate Wellness",
        "meta_description": "Learn the ultimate guide to ergonomics at home with expert clinical nutritionist Oshin Ambekar. Get the best ergonomics diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to ergonomics at home with expert clinical nutritionist Oshin Ambekar. Get the best ergonomics ...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Ergonomics</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Ergonomics Matters</h2>
        <p>When it comes to ergonomics, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized ergonomics plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-02",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 105,
        "title": "Nutrislims Guide to Energy Boost Backed by Science",
        "slug": "nutrislims-guide-to-energy-boost-backed-by-science",
        "category": "Corporate Wellness",
        "meta_description": "Learn nutrislims guide to energy boost backed by science with expert clinical nutritionist Oshin Ambekar. Get the best energy boost diet plans in Indore and online.",
        "excerpt": "Learn nutrislims guide to energy boost backed by science with expert clinical nutritionist Oshin Ambekar. Get the best e...",
        "content": "
        <p>Welcome to our comprehensive guide on <strong>Energy Boost</strong>. At Nutrislims, we believe in sustainable, science-backed nutrition.</p>
        <h2>Why Energy Boost Matters</h2>
        <p>When it comes to energy boost, understanding the root cause is essential. Our clinical approach focuses on customized meal plans tailored to your lifestyle.</p>
        <h3>Key Strategies</h3>
        <ul>
            <li>Focus on whole, unprocessed foods.</li>
            <li>Maintain hydration and adequate sleep.</li>
            <li>Consult with a certified clinical nutritionist.</li>
        </ul>
        <p>Book a consultation today to get your personalized energy boost plan!</p>
        ",
        "author": "Oshin Ambekar",
        "date": "2026-06-05",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 106,
        "title": "The Ultimate Guide to Energy Boost",
        "slug": "the-ultimate-guide-to-energy-boost",
        "category": "Corporate Wellness",
        "meta_description": "Learn the ultimate guide to energy boost with expert clinical nutritionist Oshin Ambekar. Get the best energy boost diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to energy boost with expert clinical nutritionist Oshin Ambekar. Get the best energy boost diet...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-10",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 107,
        "title": "5 Proven Tips for Quick Healthy Meals Without Starving",
        "slug": "5-proven-tips-for-quick-healthy-meals-without-starving",
        "category": "Corporate Wellness",
        "meta_description": "Learn 5 proven tips for quick healthy meals without starving with expert clinical nutritionist Oshin Ambekar. Get the best quick healthy meals diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for quick healthy meals without starving with expert clinical nutritionist Oshin Ambekar. Get the be...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "7 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 108,
        "title": "The Ultimate Guide to Desk Job Diet",
        "slug": "the-ultimate-guide-to-desk-job-diet",
        "category": "Corporate Wellness",
        "meta_description": "Learn the ultimate guide to desk job diet with expert clinical nutritionist Oshin Ambekar. Get the best desk job diet diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to desk job diet with expert clinical nutritionist Oshin Ambekar. Get the best desk job diet di...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-09",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 109,
        "title": "Expert Advice on Energy Boost at Home",
        "slug": "expert-advice-on-energy-boost-at-home",
        "category": "Corporate Wellness",
        "meta_description": "Learn expert advice on energy boost at home with expert clinical nutritionist Oshin Ambekar. Get the best energy boost diet plans in Indore and online.",
        "excerpt": "Learn expert advice on energy boost at home with expert clinical nutritionist Oshin Ambekar. Get the best energy boost d...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-09",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 110,
        "title": "The Best Diet for Desk Job Diet - A Dietitian's Perspective",
        "slug": "the-best-diet-for-desk-job-diet---a-dietitians-perspective",
        "category": "Corporate Wellness",
        "meta_description": "Learn the best diet for desk job diet - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get the best desk job diet diet plans in Indore and online.",
        "excerpt": "Learn the best diet for desk job diet - a dietitian's perspective with expert clinical nutritionist Oshin Ambekar. Get t...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-05",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 111,
        "title": "How to Manage Corporate Wellness",
        "slug": "how-to-manage-corporate-wellness",
        "category": "Corporate Wellness",
        "meta_description": "Learn how to manage corporate wellness with expert clinical nutritionist Oshin Ambekar. Get the best corporate wellness diet plans in Indore and online.",
        "excerpt": "Learn how to manage corporate wellness with expert clinical nutritionist Oshin Ambekar. Get the best corporate wellness ...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 112,
        "title": "Nutrislims Guide to Ergonomics at Home",
        "slug": "nutrislims-guide-to-ergonomics-at-home",
        "category": "Corporate Wellness",
        "meta_description": "Learn nutrislims guide to ergonomics at home with expert clinical nutritionist Oshin Ambekar. Get the best ergonomics diet plans in Indore and online.",
        "excerpt": "Learn nutrislims guide to ergonomics at home with expert clinical nutritionist Oshin Ambekar. Get the best ergonomics di...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-14",
        "read_time": "5 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 113,
        "title": "The Best Diet for Corporate Wellness Naturally",
        "slug": "the-best-diet-for-corporate-wellness-naturally",
        "category": "Corporate Wellness",
        "meta_description": "Learn the best diet for corporate wellness naturally with expert clinical nutritionist Oshin Ambekar. Get the best corporate wellness diet plans in Indore and online.",
        "excerpt": "Learn the best diet for corporate wellness naturally with expert clinical nutritionist Oshin Ambekar. Get the best corpo...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 114,
        "title": "A Clinical Approach to Energy Boost Naturally",
        "slug": "a-clinical-approach-to-energy-boost-naturally",
        "category": "Corporate Wellness",
        "meta_description": "Learn a clinical approach to energy boost naturally with expert clinical nutritionist Oshin Ambekar. Get the best energy boost diet plans in Indore and online.",
        "excerpt": "Learn a clinical approach to energy boost naturally with expert clinical nutritionist Oshin Ambekar. Get the best energy...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-10",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 115,
        "title": "Expert Advice on Energy Boost",
        "slug": "expert-advice-on-energy-boost",
        "category": "Corporate Wellness",
        "meta_description": "Learn expert advice on energy boost with expert clinical nutritionist Oshin Ambekar. Get the best energy boost diet plans in Indore and online.",
        "excerpt": "Learn expert advice on energy boost with expert clinical nutritionist Oshin Ambekar. Get the best energy boost diet plan...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-07",
        "read_time": "4 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 116,
        "title": "5 Proven Tips for Desk Job Diet in 2026",
        "slug": "5-proven-tips-for-desk-job-diet-in-2026",
        "category": "Corporate Wellness",
        "meta_description": "Learn 5 proven tips for desk job diet in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best desk job diet diet plans in Indore and online.",
        "excerpt": "Learn 5 proven tips for desk job diet in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best desk job die...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-12",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 117,
        "title": "The Ultimate Guide to Office Lunch in 2026",
        "slug": "the-ultimate-guide-to-office-lunch-in-2026",
        "category": "Corporate Wellness",
        "meta_description": "Learn the ultimate guide to office lunch in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best office lunch diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to office lunch in 2026 with expert clinical nutritionist Oshin Ambekar. Get the best office lu...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-03",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 118,
        "title": "Nutrislims Guide to Energy Boost Backed by Science",
        "slug": "nutrislims-guide-to-energy-boost-backed-by-science",
        "category": "Corporate Wellness",
        "meta_description": "Learn nutrislims guide to energy boost backed by science with expert clinical nutritionist Oshin Ambekar. Get the best energy boost diet plans in Indore and online.",
        "excerpt": "Learn nutrislims guide to energy boost backed by science with expert clinical nutritionist Oshin Ambekar. Get the best e...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-11",
        "read_time": "8 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 119,
        "title": "The Ultimate Guide to Quick Healthy Meals at Home",
        "slug": "the-ultimate-guide-to-quick-healthy-meals-at-home",
        "category": "Corporate Wellness",
        "meta_description": "Learn the ultimate guide to quick healthy meals at home with expert clinical nutritionist Oshin Ambekar. Get the best quick healthy meals diet plans in Indore and online.",
        "excerpt": "Learn the ultimate guide to quick healthy meals at home with expert clinical nutritionist Oshin Ambekar. Get the best qu...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-14",
        "read_time": "3 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    },
    {
        "id": 120,
        "title": "The Best Diet for Stress Management",
        "slug": "the-best-diet-for-stress-management",
        "category": "Corporate Wellness",
        "meta_description": "Learn the best diet for stress management with expert clinical nutritionist Oshin Ambekar. Get the best stress management diet plans in Indore and online.",
        "excerpt": "Learn the best diet for stress management with expert clinical nutritionist Oshin Ambekar. Get the best stress managemen...",
        "content": "",
        "author": "Oshin Ambekar",
        "date": "2026-06-01",
        "read_time": "6 min read",
        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
    }
];

    // Local Recipes Database for Fridge Matcher
    const RECIPES_DATA = [
        {
            keywords: ["paneer", "spinach", "palak"],
            recipeName: "Paneer Palak Bhurji",
            prepTime: "15 mins",
            calories: "220 kcal",
            macros: { protein: "16g", carbs: "8g", fat: "11g", fiber: "4g" },
            ingredientsList: ["Crumble Low-fat Paneer (80g)", "Finely chopped Spinach (1 cup)", "Onion & Tomato (1/2 cup)", "Turmeric & Jeera powder (1 tsp)"],
            instructions: ["Sauté onions and tomatoes in 1 tsp oil.", "Add spices and chopped spinach; cook for 3 mins.", "Stir in crumbled paneer and simmer for 2 mins. Serve warm."],
            healthBenefit: "Highly anti-inflammatory and excellent for low-carb PCOS insulin regulation."
        },
        {
            keywords: ["chickpeas", "chana", "cucumber", "tomato"],
            recipeName: "Spiced Chickpea Salad Bowl",
            prepTime: "10 mins",
            calories: "190 kcal",
            macros: { protein: "9g", carbs: "24g", fat: "3g", fiber: "7g" },
            ingredientsList: ["Boiled Chickpeas (1 cup)", "Chopped Cucumber & Tomato (1 cup)", "Lemon juice & Mint leaves", "Chaat Masala & Roasted Cumin"],
            instructions: ["Drain boiled chickpeas and toss in a large bowl.", "Add cucumber, tomato, mint, and spices.", "Squeeze fresh lemon juice over it and mix thoroughly. Enjoy fresh!"],
            healthBenefit: "High fiber and complex carbs prevent glucose spikes, ideal for Diabetes control."
        },
        {
            keywords: ["oats", "curd", "carrot"],
            recipeName: "Savory Oats Idli",
            prepTime: "25 mins",
            calories: "240 kcal",
            macros: { protein: "10g", carbs: "32g", fat: "4g", fiber: "6g" },
            ingredientsList: ["Powdered Rolled Oats (1/2 cup)", "Low-fat Curd (1/2 cup)", "Grated Carrots & Mustard seeds", "Pinch of Baking Soda"],
            instructions: ["Mix oats, curd, carrots, and warm water into a batter. Let rest.", "Temper with mustard seeds and add baking soda.", "Steam in idli molds for 12 mins. Serve with mint chutney."],
            healthBenefit: "Contains beta-glucan fiber which helps lower cholesterol and stabilize gut health."
        },
        {
            keywords: ["tofu", "peppers", "capsicum", "onion"],
            recipeName: "High Protein Tofu Sauté",
            prepTime: "15 mins",
            calories: "210 kcal",
            macros: { protein: "15g", carbs: "12g", fat: "8g", fiber: "5g" },
            ingredientsList: ["Firm Tofu cubes (100g)", "Sliced Capsicum & Onions (1 cup)", "Ginger-Garlic paste (1 tsp)", "Black Pepper & Soy Sauce (1 tsp)"],
            instructions: ["Sauté ginger-garlic paste and onions in 1 tsp olive oil.", "Toss capsicum and tofu cubes in. Sauté on high for 5 mins.", "Season with soy sauce and black pepper. Serve hot."],
            healthBenefit: "Excellent plant protein source for muscle recovery and metabolic rate speedup."
        },
        {
            keywords: ["sattu", "curd", "coriander"],
            recipeName: "Sattu Vitality Drink",
            prepTime: "5 mins",
            calories: "160 kcal",
            macros: { protein: "8g", carbs: "20g", fat: "2g", fiber: "6g" },
            ingredientsList: ["Roasted Gram Flour / Sattu (3 tbsp)", "Chilled Water (300ml)", "Black Salt & Lemon juice", "Chopped Coriander & Roasted Jeera"],
            instructions: ["Whisk sattu, black salt, and lemon juice into chilled water until smooth.", "Garnish with fresh coriander and roasted jeera powder.", "Drink immediately on an empty stomach for cooling digestion."],
            healthBenefit: "Rich in plant protein and dietary fiber, keeping you full for hours."
        }
    ];

    /* ==========================================================================
       1. STATIC PAGE ROUTER HELPERS
       ========================================================================== */
    const isHomepage = document.body.classList.contains('home-page-body');
    const navbar = document.getElementById('navbar');
    
    // Navbar Scroll Background Change
    function handleScroll() {
        if (navbar) {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // Mobile menu drawer toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    
    if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.addEventListener('click', () => mobileDrawer.classList.add('open'));
    }
    if (drawerCloseBtn && mobileDrawer) {
        drawerCloseBtn.addEventListener('click', () => mobileDrawer.classList.remove('open'));
    }

    /* ==========================================================================
       2. TESTIMONIALS CAROUSEL
       ========================================================================== */
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const indicators = document.querySelectorAll('#carousel-indicators .indicator');
    const slides = document.querySelectorAll('.testimonial-slide');
    
    if (carouselTrack && slides.length > 0) {
        let currentSlide = 0;
        let autoTimer;
        
        function updateCarousel(index) {
            currentSlide = index;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            if (currentSlide >= slides.length) currentSlide = 0;
            
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            indicators.forEach((ind, i) => {
                if (i === currentSlide) ind.classList.add('active');
                else ind.classList.remove('active');
            });
        }
        
        function startAuto() {
            autoTimer = setInterval(() => updateCarousel(currentSlide + 1), 5000);
        }
        function stopAuto() {
            clearInterval(autoTimer);
        }
        
        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                stopAuto(); updateCarousel(currentSlide - 1); startAuto();
            });
        }
        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                stopAuto(); updateCarousel(currentSlide + 1); startAuto();
            });
        }
        indicators.forEach(ind => {
            ind.addEventListener('click', function() {
                stopAuto();
                updateCarousel(parseInt(this.getAttribute('data-slide')));
                startAuto();
            });
        });
        
        carouselTrack.addEventListener('mouseenter', stopAuto);
        carouselTrack.addEventListener('mouseleave', startAuto);
        
        updateCarousel(0);
        startAuto();
    }

    /* ==========================================================================
       3. CLINICAL HEALTH MATRIX SLIDERS
       ========================================================================== */
    const waterSlider = document.getElementById('water-slider');
    const sleepSlider = document.getElementById('sleep-slider');
    const activitySlider = document.getElementById('activity-slider');
    
    if (waterSlider && sleepSlider && activitySlider) {
        const waterVal = document.getElementById('water-val');
        const sleepVal = document.getElementById('sleep-val');
        const activityVal = document.getElementById('activity-val');
        
        const metabolicFill = document.getElementById('metabolic-fill');
        const inflammationFill = document.getElementById('inflammation-fill');
        const vitalityFill = document.getElementById('vitality-fill');
        
        const metabolicText = document.getElementById('metabolic-text');
        const inflammationText = document.getElementById('inflammation-text');
        const vitalityText = document.getElementById('vitality-text');
        
        const ARC_CIRCUMFERENCE = 251.2;
        
        function updateMatrix() {
            const water = parseFloat(waterSlider.value);
            const sleep = parseFloat(sleepSlider.value);
            const activity = parseFloat(activitySlider.value);
            
            waterVal.textContent = `${water} Liters`;
            sleepVal.textContent = `${sleep} Hours`;
            activityVal.textContent = `${activity} Minutes`;
            
            // Metabolic Calculation
            const wMet = Math.min(1.0, water / 3.0);
            const sMet = Math.min(1.0, sleep / 8.0);
            const aMet = Math.min(1.0, activity / 45.0);
            const metabolicScore = Math.round((wMet * 30) + (sMet * 30) + (aMet * 40));
            
            // Inflammation Calculation
            let sInf = (sleep <= 8) ? (sleep - 4) / 4 : Math.max(0.5, 1.0 - (sleep - 8) * 0.25);
            let wInf = Math.min(1.0, water / 3.5);
            let aInf = (activity <= 45) ? activity / 45 : Math.max(0.6, 1.0 - (activity - 45) * 0.01);
            const inflammationScore = Math.round((sInf * 45) + (wInf * 30) + (aInf * 25));
            
            // Vitality Score
            const vitalityScore = Math.round((metabolicScore * 0.5) + (inflammationScore * 0.5));
            
            updateArc(metabolicFill, metabolicText, metabolicScore, true);
            updateArc(inflammationFill, inflammationText, inflammationScore, true);
            updateArc(vitalityFill, vitalityText, vitalityScore, false);
        }
        
        function updateArc(element, textElement, score, showPercent) {
            const offset = ARC_CIRCUMFERENCE - (score / 100) * ARC_CIRCUMFERENCE;
            element.style.strokeDashoffset = offset;
            textElement.textContent = showPercent ? `${score}%` : score;
        }
        
        [waterSlider, sleepSlider, activitySlider].forEach(slider => {
            slider.addEventListener('input', updateMatrix);
        });
        
        updateMatrix();
    }

    /* ==========================================================================
       4. CLIENT-SIDE RECIPE BUILDER
       ========================================================================== */
    const tagsContainer = document.getElementById('tags-input-box');
    const ingredientInput = document.getElementById('ingredient-input');
    const btnBuildRecipe = document.getElementById('btn-build-recipe');
    
    if (tagsContainer && ingredientInput && btnBuildRecipe) {
        let enteredIngredients = [];
        
        function addTag(text) {
            text = text.trim().toLowerCase();
            if (text && !enteredIngredients.includes(text)) {
                enteredIngredients.push(text);
                
                const tagEl = document.createElement('span');
                tagEl.className = 'ingredient-tag';
                tagEl.innerHTML = `${text} <span class="tag-remove">&times;</span>`;
                
                tagEl.querySelector('.tag-remove').addEventListener('click', () => {
                    enteredIngredients = enteredIngredients.filter(item => item !== text);
                    tagEl.remove();
                });
                
                tagsContainer.insertBefore(tagEl, ingredientInput);
            }
            ingredientInput.value = '';
        }
        
        ingredientInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                addTag(ingredientInput.value);
            }
        });
        
        btnBuildRecipe.addEventListener('click', () => {
            addTag(ingredientInput.value);
            
            if (enteredIngredients.length === 0) {
                alert("Please add at least one ingredient!");
                return;
            }
            
            const recipePlaceholder = document.getElementById('recipe-placeholder');
            const recipeLoader = document.getElementById('recipe-loader');
            const recipeCardResult = document.getElementById('recipe-card-result');
            
            recipePlaceholder.classList.add('hidden');
            recipeLoader.classList.remove('hidden');
            recipeCardResult.classList.add('hidden');
            
            setTimeout(() => {
                // Find matching recipe in local database
                let matched = null;
                for (let rec of RECIPES_DATA) {
                    // Check if user ingredients contain any of keywords
                    const intersection = rec.keywords.filter(keyword => enteredIngredients.some(userInput => userInput.includes(keyword) || keyword.includes(userInput)));
                    if (intersection.length > 0) {
                        matched = rec;
                        break;
                    }
                }
                
                // Fallback recipe if no matches found
                if (!matched) {
                    matched = {
                        recipeName: `Custom Health Salad (${enteredIngredients.join(' & ')})`,
                        prepTime: "10 mins",
                        calories: "180 kcal",
                        macros: { protein: "8g", carbs: "15g", fat: "4g", fiber: "5g" },
                        ingredientsList: enteredIngredients.map(ing => `${ing.charAt(0).toUpperCase() + ing.slice(1)} (As available)`).concat(["Tossed Mixed Seeds (1 tbsp)", "Lemon & Olive Oil dressing"]),
                        instructions: ["Rinse and chop ingredients into a bowl.", "Toss with lemon juice, salt, pepper, and seeds.", "Serve fresh for immediate fiber-dense metabolic support."],
                        healthBenefit: "Highly customizable whole food fibers enhance digestion and clean insulin absorption."
                    };
                }
                
                // Populate DOM
                document.getElementById('res-recipe-name').textContent = matched.recipeName;
                document.getElementById('res-prep-time').textContent = matched.prepTime;
                document.getElementById('res-calories').textContent = matched.calories;
                document.getElementById('res-protein').textContent = matched.macros.protein;
                document.getElementById('res-carbs').textContent = matched.macros.carbs;
                document.getElementById('res-fat').textContent = matched.macros.fat;
                document.getElementById('res-fiber').textContent = matched.macros.fiber;
                
                const ingList = document.getElementById('res-ingredients');
                ingList.innerHTML = '';
                matched.ingredientsList.forEach(ing => {
                    const li = document.createElement('li');
                    li.textContent = ing;
                    ingList.appendChild(li);
                });
                
                const instList = document.getElementById('res-instructions');
                instList.innerHTML = '';
                matched.instructions.forEach(step => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    instList.appendChild(li);
                });
                
                document.getElementById('res-benefit').textContent = matched.healthBenefit;
                
                recipeLoader.classList.add('hidden');
                recipeCardResult.classList.remove('hidden');
            }, 1200);
        });
    }

    /* ==========================================================================
       5. SERVICES MODALS
       ========================================================================== */
    const openModalBtns = document.querySelectorAll('.btn-open-modal');
    const closeModalBtns = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');
    
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.getAttribute('data-service');
            let target;
            if (service === 'weight-loss') target = document.getElementById('modal-weight-loss');
            else if (service === 'clinical') target = document.getElementById('modal-clinical');
            else if (service === 'online-consult') target = document.getElementById('modal-online-consult');
            else if (service === 'meal-plans') target = document.getElementById('modal-meal-plans');
            
            if (target) target.classList.add('open');
        });
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => modals.forEach(m => m.classList.remove('open')));
    });
    
    window.addEventListener('click', (e) => {
        modals.forEach(m => { if (e.target === m) m.classList.remove('open'); });
    });

    /* ==========================================================================
       6. MULTI-STEP LOCAL BOOKING WIZARD
       ========================================================================== */
    const bookingSteps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3'),
        document.getElementById('step-4'),
        document.getElementById('step-5')
    ];
    
    if (bookingSteps[0]) {
        let currentStep = 1;
        const bookingBackBtn = document.getElementById('btn-booking-back');
        const bookingNextBtn = document.getElementById('btn-booking-next');
        const progressBarFill = document.getElementById('booking-progress-fill');
        const progressStepTitle = document.getElementById('booking-step-title');
        const progressStepNum = document.getElementById('booking-step-num');
        const bookingNavBox = document.getElementById('booking-nav-buttons');
        
        let selectedService = '';
        let selectedPrice = '';
        let selectedDate = '';
        let selectedTime = '';
        let clientName = '';
        let clientEmail = '';
        let clientPhone = '';
        let clientGoal = '';
        
        // Auto-select service if passed in url query params
        const urlParams = new URLSearchParams(window.location.search);
        const queryService = urlParams.get('service');
        if (queryService) {
            const matchedRadio = document.querySelector(`input[name="booking_service"][value="${queryService}"]`);
            if (matchedRadio) {
                matchedRadio.checked = true;
            }
        }
        
        const stepTitles = [
            "Step 1: Select Service",
            "Step 2: Pick Date & Time",
            "Step 3: Enter Details",
            "Step 4: Complete Payment",
            "Booking Confirmed!"
        ];
        
        function updateStep(step) {
            currentStep = step;
            bookingSteps.forEach((el, i) => {
                if (i === currentStep - 1) el.classList.remove('hidden');
                else el.classList.add('hidden');
            });
            
            progressBarFill.style.width = `${(currentStep / 5) * 100}%`;
            progressStepTitle.textContent = stepTitles[currentStep - 1];
            progressStepNum.textContent = `Step ${currentStep} of 5`;
            
            if (currentStep === 1 || currentStep === 5) bookingBackBtn.classList.add('hidden');
            else bookingBackBtn.classList.remove('hidden');
            
            if (currentStep === 4) {
                bookingNextBtn.textContent = `Pay Securely (₹${selectedPrice})`;
            } else {
                bookingNextBtn.textContent = "Next Step";
            }
            
            if (currentStep === 5) bookingNavBox.classList.add('hidden');
            else bookingNavBox.classList.remove('hidden');
        }
        
        bookingBackBtn.addEventListener('click', () => {
            if (currentStep > 1) updateStep(currentStep - 1);
        });
        
        bookingNextBtn.addEventListener('click', () => {
            if (currentStep === 1) {
                const radio = document.querySelector('input[name="booking_service"]:checked');
                if (!radio) { alert("Please choose a service."); return; }
                selectedService = radio.value;
                selectedPrice = radio.getAttribute('data-price');
                initCalendar();
                updateStep(2);
            } 
            else if (currentStep === 2) {
                if (!selectedDate) { alert("Select a date."); return; }
                const slot = document.querySelector('input[name="booking_slot"]:checked');
                if (!slot) { alert("Select a time slot."); return; }
                selectedTime = slot.value;
                updateStep(3);
            } 
            else if (currentStep === 3) {
                clientName = document.getElementById('bk-name').value.trim();
                clientEmail = document.getElementById('bk-email').value.trim();
                clientPhone = document.getElementById('bk-phone').value.trim();
                clientGoal = document.getElementById('bk-goal').value.trim();
                
                if (!clientName || !clientEmail || !clientPhone) {
                    alert("Name, Email, and Phone number are required.");
                    return;
                }
                document.getElementById('pay-total-amount').textContent = `₹${selectedPrice}`;
                updateStep(4);
            } 
            else if (currentStep === 4) {
                bookingNextBtn.disabled = true;
                bookingNextBtn.textContent = "Processing payment...";
                
                setTimeout(() => {
                    const newBooking = {
                        id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
                        name: clientName,
                        email: clientEmail,
                        phone: clientPhone,
                        service: selectedService,
                        date: selectedDate,
                        time: selectedTime,
                        goal: clientGoal
                    };
                    
                    // Save booking in localStorage
                    const localBookings = JSON.parse(localStorage.getItem('nutrislims_bookings') || '[]');
                    localBookings.push(newBooking);
                    localStorage.setItem('nutrislims_bookings', JSON.stringify(localBookings));

                    const finalizeBooking = () => {
                        // Populate step 5
                        document.getElementById('conf-service').textContent = selectedService;
                        document.getElementById('conf-date').textContent = selectedDate;
                        document.getElementById('conf-time').textContent = selectedTime;
                        document.getElementById('conf-ref').textContent = newBooking.id;
                        bookingNextBtn.disabled = false;
                        updateStep(5);
                    };

                    if (GOOGLE_SHEET_WEB_APP_URL) {
                        fetch(GOOGLE_SHEET_WEB_APP_URL, {
                            method: "POST",
                            mode: "no-cors",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                type: "booking",
                                ...newBooking
                            })
                        }).then(() => {
                            finalizeBooking();
                        }).catch(err => {
                            console.error("Sheets booking error:", err);
                            finalizeBooking();
                        });
                    } else {
                        finalizeBooking();
                    }
                }, 1500);
            }
        });
        
        // Step 4 Switch Cards
        const pmCard = document.getElementById('pm-card');
        const pmUpi = document.getElementById('pm-upi');
        const cardFieldsBox = document.getElementById('card-fields-box');
        const upiFieldsBox = document.getElementById('upi-fields-box');
        
        if (pmCard && pmUpi) {
            pmCard.addEventListener('change', () => {
                cardFieldsBox.classList.remove('hidden'); upiFieldsBox.classList.add('hidden');
            });
            pmUpi.addEventListener('change', () => {
                cardFieldsBox.classList.add('hidden'); upiFieldsBox.classList.remove('hidden');
            });
        }
        
        // Calendar Grid
        let calYear = 2026;
        let calMonth = 5; // June
        
        function initCalendar() {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            document.getElementById('calendar-month-year').textContent = `${months[calMonth]} ${calYear}`;
            
            const daysContainer = document.getElementById('calendar-days-container');
            daysContainer.innerHTML = '';
            
            ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(d => {
                const el = document.createElement('div'); el.className = 'calendar-day-header'; el.textContent = d; daysContainer.appendChild(el);
            });
            
            const firstIndex = new Date(calYear, calMonth, 1).getDay();
            const daysCount = new Date(calYear, calMonth + 1, 0).getDate();
            
            for (let i = 0; i < firstIndex; i++) daysContainer.appendChild(document.createElement('div'));
            
            const today = new Date();
            for (let day = 1; day <= daysCount; day++) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'calendar-day-btn';
                btn.textContent = day;
                
                const thisDate = new Date(calYear, calMonth, day);
                const thisDateStr = `${calYear}-${String(calMonth+1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                
                if (thisDate.getDay() === 0 || thisDate < today.setHours(0,0,0,0)) {
                    btn.disabled = true;
                }
                
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-day-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    selectedDate = thisDateStr;
                    generateTimeSlots(thisDateStr);
                });
                
                daysContainer.appendChild(btn);
            }
        }
        
        document.getElementById('cal-prev-month').addEventListener('click', () => {
            calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; }
            initCalendar();
        });
        document.getElementById('cal-next-month').addEventListener('click', () => {
            calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; }
            initCalendar();
        });
        
        function generateTimeSlots(dateStr) {
            const slotsContainer = document.getElementById('slots-container');
            slotsContainer.innerHTML = '';
            
            const defaultTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
            const localBookings = JSON.parse(localStorage.getItem('nutrislims_bookings') || '[]');
            
            defaultTimes.forEach((time, index) => {
                const isBooked = localBookings.some(bk => bk.date === dateStr && bk.time === time);
                
                const wrapper = document.createElement('div');
                const disabledAttr = isBooked ? 'disabled' : '';
                const opacityStyle = isBooked ? 'style="opacity:0.4; cursor:not-allowed;"' : '';
                
                wrapper.innerHTML = `
                    <input type="radio" name="booking_slot" id="sl-${index}" value="${time}" class="slot-radio" ${disabledAttr}>
                    <label for="sl-${index}" class="slot-label" ${opacityStyle}>${time}</label>
                `;
                slotsContainer.appendChild(wrapper);
            });
        }
        
        updateStep(1);
    }

    /* ==========================================================================
       7. AI DIET QUIZ SLIDER FLOW (CLIENT-SIDE SCORING)
       ========================================================================== */
    const quizWizardCard = document.getElementById('quiz-wizard-card');
    const quizEmailCard = document.getElementById('quiz-email-card');
    const quizResultsCard = document.getElementById('quiz-results-card');
    
    if (quizWizardCard) {
        let currentQuizStep = 1;
        const totalQuizSteps = 8;
        const quizScreens = document.querySelectorAll('.quiz-question-screen');
        const quizBackBtn = document.getElementById('btn-quiz-back');
        const quizNextBtn = document.getElementById('btn-quiz-next');
        const quizFill = document.getElementById('quiz-progress-fill');
        const quizProgressText = document.getElementById('quiz-progress-text');
        
        const quizAnswers = {};
        
        function updateQuizStep(step) {
            currentQuizStep = step;
            quizScreens.forEach((screen) => {
                const screenStep = parseInt(screen.getAttribute('data-step'));
                screen.classList.remove('active', 'prev', 'next');
                
                if (screenStep === currentQuizStep) screen.classList.add('active');
                else if (screenStep < currentQuizStep) screen.classList.add('prev');
                else screen.classList.add('next');
            });
            
            quizFill.style.width = `${(currentQuizStep / totalQuizSteps) * 100}%`;
            quizProgressText.textContent = `Question ${currentQuizStep} of ${totalQuizSteps}`;
            
            if (currentQuizStep === 1) quizBackBtn.classList.add('hidden');
            else quizBackBtn.classList.remove('hidden');
            
            if (currentQuizStep === totalQuizSteps) quizNextBtn.textContent = "Compile Results";
            else quizNextBtn.textContent = "Next Question";
        }
        
        quizBackBtn.addEventListener('click', () => {
            if (currentQuizStep > 1) updateQuizStep(currentQuizStep - 1);
        });
        
        quizNextBtn.addEventListener('click', () => {
            const activeScreen = document.querySelector('.quiz-question-screen.active');
            const checkedOption = activeScreen.querySelector('input[type="radio"]:checked');
            if (!checkedOption) { alert("Please select an option."); return; }
            
            quizAnswers[currentQuizStep] = checkedOption.value;
            
            if (currentQuizStep < totalQuizSteps) {
                updateQuizStep(currentQuizStep + 1);
            } else {
                quizWizardCard.classList.add('hidden');
                quizEmailCard.classList.remove('hidden');
            }
        });
        
        const leadForm = document.getElementById('quiz-lead-form');
        if (leadForm) {
            leadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('qz-email').value;
                const phone = document.getElementById('qz-phone').value;
                
                const leadSubmitBtn = leadForm.querySelector('button[type="submit"]');
                leadSubmitBtn.disabled = true;
                leadSubmitBtn.textContent = "Analyzing profile...";
                
                setTimeout(() => {
                    // Evaluate personality archetype
                    const goal = quizAnswers[1];
                    const conditions = quizAnswers[5];
                    const activity = quizAnswers[3];
                    
                    let result = {
                        personality: "Clean Eater",
                        icon: "🌿",
                        description: "You focus on clean longevity and functional wellness. Your digestive system is balanced, meaning you respond exceptionally well to whole, single-ingredient foods, color-rich antioxidants, and light grains.",
                        tip: "Follow the 'Rainbow Plate' concept — ensure your lunch and dinner contain at least 3 different colors of fresh vegetables.",
                        foods: ["Fresh Fruits", "Leafy Greens", "Amla Juice", "Warm Lemon Water", "Millets"]
                    };
                    
                    if (conditions === 'Diabetes' || conditions === 'PCOS' || conditions === 'Thyroid') {
                        result = {
                            personality: "Gut Healer",
                            icon: "🛡️",
                            description: "Your endocrine and digestive systems require gentle, anti-inflammatory support. You thrive on prebiotics, fermented foods, and fiber that stabilize hormone spikes, soothe PCOS symptoms, and regulate insulin levels.",
                            tip: "Add 1 tbsp of soaked chia seeds to your morning routine and switch to Spearmint tea to soothe systemic inflammation.",
                            foods: ["Ginger & Turmeric", "Spearmint Tea", "Walnuts", "Prebiotic Fiber (Oats)", "Buttermilk"]
                        };
                    } else if (goal === 'Weight Loss') {
                        result = {
                            personality: "Metabolic Booster",
                            icon: "⚡",
                            description: "Your profile is geared towards optimized fat oxidation and lean muscle retention. You benefit from a thermogenic, high-protein structure that increases caloric expenditure naturally.",
                            tip: "Ensure every meal contains a portion of protein (paneer, tofu, sprouts) to boost your resting metabolic rate.",
                            foods: ["Paneer/Tofu", "Sprouted Moong", "Cinnamon Water", "High-Fiber Veg", "Besan Chilla"]
                        };
                    } else if (goal === 'Muscle Gain' || activity === 'Highly Active') {
                        result = {
                            personality: "Energy Seeker",
                            icon: "☀️",
                            description: "Your active lifestyle requires efficient glycogen restoration and complex carbohydrate fueling. You need nutrient-dense, slow-releasing energy sources to avoid energy crashes.",
                            tip: "Incorporate complex starch like sweet potatoes or brown rice before workouts to maximize glycogen storage.",
                            foods: ["Makhana", "Bananas & Dates", "Sweet Potatoes", "Oats", "Mixed Seeds"]
                        };
                    }
                    
                    // Save lead to localStorage
                    const localLeads = JSON.parse(localStorage.getItem('nutrislims_leads') || '[]');
                    localLeads.push({ email, phone, personality: result.personality, answers: quizAnswers });
                    localStorage.setItem('nutrislims_leads', JSON.stringify(localLeads));

                    const finalizeQuizLead = () => {
                        // Display results
                        document.getElementById('res-icon').textContent = result.icon;
                        document.getElementById('res-personality-name').textContent = result.personality;
                        document.getElementById('res-desc').textContent = result.description;
                        document.getElementById('res-tip').textContent = result.tip;
                        
                        const foodTags = document.getElementById('res-foods');
                        foodTags.innerHTML = '';
                        result.foods.forEach(f => {
                            const span = document.createElement('span');
                            span.className = 'food-tag-badge';
                            span.textContent = f;
                            foodTags.appendChild(span);
                        });
                        
                        document.getElementById('btn-quiz-book-redirect').href = (result.personality === 'Gut Healer') ? 'book.html?service=Clinical Nutrition' : 'book.html?service=Weight Loss Management';
                        
                        quizEmailCard.classList.add('hidden');
                        quizResultsCard.classList.remove('hidden');
                        leadSubmitBtn.disabled = false;
                    };

                    if (GOOGLE_SHEET_WEB_APP_URL) {
                        fetch(GOOGLE_SHEET_WEB_APP_URL, {
                            method: "POST",
                            mode: "no-cors",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                type: "quiz",
                                name: "Quiz Lead",
                                email: email,
                                phone: phone || "N/A",
                                score: "85",
                                archetype: result.personality,
                                actionTip: result.tip
                            })
                        }).then(() => {
                            finalizeQuizLead();
                        }).catch(err => {
                            console.error("Sheets quiz lead error:", err);
                            finalizeQuizLead();
                        });
                    } else {
                        finalizeQuizLead();
                    }
                }, 1500);
            });
        }
        updateQuizStep(1);
    }

    /* ==========================================================================
       8. CONTACT FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = "Sending message...";
            
            setTimeout(() => {
                const name = document.getElementById('ct-name').value;
                const email = document.getElementById('ct-email').value;
                const phone = document.getElementById('ct-phone').value;
                const msg = document.getElementById('ct-msg').value;
                
                const contactPayload = {
                    type: "contact",
                    name,
                    email,
                    phone,
                    subject: "Website Contact Form Inquiry",
                    message: msg
                };

                // Save contact submission
                const localContacts = JSON.parse(localStorage.getItem('nutrislims_contacts') || '[]');
                localContacts.push({ ...contactPayload, date: new Date().toISOString() });
                localStorage.setItem('nutrislims_contacts', JSON.stringify(localContacts));
                
                const finalizeContact = () => {
                    contactForm.reset();
                    document.getElementById('contact-success').classList.remove('hidden');
                    btn.disabled = false;
                    btn.textContent = "Send Message";
                    setTimeout(() => document.getElementById('contact-success').classList.add('hidden'), 5000);
                };

                if (GOOGLE_SHEET_WEB_APP_URL) {
                    fetch(GOOGLE_SHEET_WEB_APP_URL, {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contactPayload)
                    }).then(() => {
                        finalizeContact();
                    }).catch(err => {
                        console.error("Sheets contact error:", err);
                        finalizeContact();
                    });
                } else {
                    finalizeContact();
                }
            }, 1000);
        });
    }

    /* ==========================================================================
       9. CLIENT-SIDE BLOG ENGINE
       ========================================================================== */
    const homeBlogGrid = document.getElementById('home-blog-grid');
    const blogGridContainer = document.getElementById('blog-grid-container');
    const blogPagination = document.getElementById('blog-pagination');
    const searchInput = document.getElementById('blog-search-input');
    const searchBtn = document.getElementById('btn-blog-search');
    const categoryBtns = document.querySelectorAll('#blog-categories-list .category-filter-btn');
    
    // 9.1 Populate homepage blogs
    if (homeBlogGrid) {
        homeBlogGrid.innerHTML = '';
        BLOGS_DATA.slice(0, 3).forEach(blog => {
            const article = document.createElement('article');
            article.className = 'blog-card';
            article.innerHTML = `
                <div class="blog-thumb">
                    <img src="${blog.image}" alt="${blog.title}">
                    <span class="blog-category-badge">${blog.category}</span>
                </div>
                <div class="blog-card-body">
                    <div class="blog-date-time">${blog.date} | ${blog.read_time}</div>
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt}</p>
                    <a href="blog-detail.html?id=${blog.id}" class="blog-read-more">Read More &rarr;</a>
                </div>
            `;
            homeBlogGrid.appendChild(article);
        });
    }
    
    // 9.2 Populate main blog list page
    if (blogGridContainer) {
        let activeCategory = 'All';
        let activeQuery = '';
        let activePage = 1;
        const pageSize = 4;
        
        function renderBlogsList() {
            blogGridContainer.innerHTML = '';
            
            // Filter blogs
            let filtered = BLOGS_DATA.filter(b => {
                const matchCat = (activeCategory === 'All' || b.category === activeCategory);
                const matchQuery = (!activeQuery || b.title.toLowerCase().includes(activeQuery) || b.excerpt.toLowerCase().includes(activeQuery));
                return matchCat && matchQuery;
            });
            
            if (filtered.length === 0) {
                blogGridContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px; grid-column: 1/-1;">
                        <h3>No Articles Found</h3>
                        <p style="color: var(--text-muted);">Try a different keyword or category.</p>
                    </div>
                `;
                blogPagination.innerHTML = '';
                return;
            }
            
            // Paginate
            const totalPages = Math.ceil(filtered.length / pageSize);
            const start = (activePage - 1) * pageSize;
            const paginated = filtered.slice(start, start + pageSize);
            
            paginated.forEach(blog => {
                const article = document.createElement('article');
                article.className = 'blog-card';
                article.innerHTML = `
                    <div class="blog-thumb">
                        <img src="${blog.image}" alt="${blog.title}">
                        <span class="blog-category-badge">${blog.category}</span>
                    </div>
                    <div class="blog-card-body">
                        <div class="blog-date-time">${blog.date} | ${blog.read_time}</div>
                        <h3 style="font-size:18px;">${blog.title}</h3>
                        <p style="font-size:13px;">${blog.excerpt}</p>
                        <a href="blog-detail.html?id=${blog.id}" class="blog-read-more" style="font-size:12px;">Read More &rarr;</a>
                    </div>
                `;
                blogGridContainer.appendChild(article);
            });
            
            // Render Pagination numbers
            blogPagination.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const link = document.createElement('button');
                link.className = `page-num-link ${activePage === i ? 'active' : ''}`;
                link.type = 'button';
                link.textContent = i;
                link.addEventListener('click', () => {
                    activePage = i;
                    renderBlogsList();
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                });
                blogPagination.appendChild(link);
            }
        }
        
        // Category filters
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-category');
                activePage = 1;
                renderBlogsList();
            });
        });
        
        // Search trigger
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                activeQuery = searchInput.value.trim().toLowerCase();
                activePage = 1;
                renderBlogsList();
            });
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    activeQuery = searchInput.value.trim().toLowerCase();
                    activePage = 1;
                    renderBlogsList();
                }
            });
        }
        
        renderBlogsList();
    }
    
    // 9.3 Dynamic blog details parser
    const detailHeader = document.getElementById('blog-detail-header');
    const detailBanner = document.getElementById('blog-detail-banner');
    const detailContent = document.getElementById('blog-rich-content');
    const recentBlogList = document.getElementById('blog-recent-list');
    
    if (detailContent) {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = parseInt(urlParams.get('id') || '1');
        
        const matched = BLOGS_DATA.find(b => b.id === articleId) || BLOGS_DATA[0];
        
        detailHeader.innerHTML = `
            <span class="blog-category-badge" style="position: static; display: inline-block; align-self: center;">${matched.category}</span>
            <h1>${matched.title}</h1>
            <div class="blog-detail-meta">
                <span>📅 Published: ${matched.date}</span>
                <span>⏱️ Read Time: ${matched.read_time}</span>
                <span>✍️ Author: Oshin Ambekar</span>
            </div>
        `;
        
        detailBanner.innerHTML = `<img src="${matched.image}" alt="${matched.title}">`;
        detailContent.innerHTML = matched.content + `
            <div style="margin-top: 40px; border-top: 2px solid var(--primary-light); padding-top: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <h5 style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Share this article:</h5>
                <div class="footer-socials" style="margin-top: 0;">
                    <a href="#">🐦</a>
                    <a href="#">📘</a>
                    <a href="#">💼</a>
                </div>
            </div>
        `;
        
        // Render recent items sidebar
        if (recentBlogList) {
            recentBlogList.innerHTML = '';
            BLOGS_DATA.filter(b => b.id !== matched.id).slice(0, 3).forEach(post => {
                const link = document.createElement('a');
                link.href = `blog-detail.html?id=${post.id}`;
                link.style.cssText = "display: flex; gap: 12px; align-items: flex-start; text-decoration: none; color: inherit;";
                link.innerHTML = `
                    <img src="${post.image}" alt="${post.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-light); flex-shrink: 0;">
                    <div>
                        <h5 style="font-size: 14px; line-height: 1.3; font-weight: 600; color: var(--text-dark); margin-bottom: 2px;">${post.title}</h5>
                        <span style="font-size: 11px; color: var(--text-muted);">${post.date}</span>
                    </div>
                `;
                recentBlogList.appendChild(link);
            });
        }
    }

    /* ==========================================================================
       10. LOCAL SMART CHATBOT RESPONDERS
       ========================================================================== */
    const chatbotTrigger = document.getElementById('chatbot-trigger');
    const chatbotClose = document.getElementById('chatbot-close-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotBody = document.getElementById('chatbot-body');
    
    if (chatbotTrigger && chatbotWindow) {
        chatbotTrigger.addEventListener('click', () => {
            chatbotWindow.classList.toggle('hidden');
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        });
        if (chatbotClose) {
            chatbotClose.addEventListener('click', () => chatbotWindow.classList.add('hidden'));
        }
        
        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const msgText = chatbotInput.value.trim();
            if (!msgText) return;
            
            chatbotInput.value = '';
            
            // Render user message
            const userEl = document.createElement('div');
            userEl.className = 'chat-message user-message';
            userEl.textContent = msgText;
            chatbotBody.appendChild(userEl);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
            
            // Typing indicator
            const typingEl = document.createElement('div');
            typingEl.className = 'chat-typing-indicator';
            typingEl.textContent = "Assistant is typing...";
            chatbotBody.appendChild(typingEl);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
            
            setTimeout(() => {
                typingEl.remove();
                
                let reply = "That's a great question! 🌿 Every body is biochemically unique. I highly recommend checking out our **Free Diet Quiz** on quiz.html to find your nutrition archetype, or booking a **Free 15-minute Discovery Consultation** on book.html so Oshin can audit your goals directly.";
                
                const lower = msgText.toLowerCase();
                
                if (lower.includes('pcos') || lower.includes('pcod') || lower.includes('hormon')) {
                    reply = "For PCOS/PCOD, Oshin recommends anti-inflammatory grains (oats, ragi) and low Glycemic Index foods to control insulin spikes. Incorporating spearmint tea twice a day and soaked almonds/walnuts helps naturally reduce free testosterone levels. Check out our **Clinical Nutrition** program on services.html!";
                } else if (lower.includes('diabet') || lower.includes('sugar')) {
                    reply = "Managing Type-2 Diabetes requires low GI foods that digest slowly. Oshin focuses on fenugreek seeds, bitter gourd, high-fiber oats, and cinnamon. Avoid refined flour (maida), packed fruit juices, and sweets. Our **Clinical Nutrition Therapy** program on services.html is specifically structured for diabetes reversal.";
                } else if (lower.includes('weight') || lower.includes('lose') || lower.includes('fat') || lower.includes('slim')) {
                    reply = "Sustainable weight loss is about boosting your metabolism, not starvation. We construct high-fiber, high-protein Indian menus that maximize satiety. Our **Weight Loss Management** program (services.html) offers custom weekly plans, WhatsApp logging, and portion guidance.";
                } else if (lower.includes('fee') || lower.includes('price') || lower.includes('cost') || lower.includes('charge')) {
                    reply = "Our service rates are:\n- Weight Loss: ₹4,999/month ($75)\n- Clinical Nutrition: ₹5,999/month ($90)\n- Meal Plans: ₹3,499/month ($55)\n- 1-on-1 Online Consult: ₹2,499/session ($40)\nYou can review these details on services.html!";
                } else if (lower.includes('book') || lower.includes('consult') || lower.includes('appointment')) {
                    reply = "You can schedule a consultation instantly on book.html! It features a dynamic calendar where you pick an available time slot and secure your booking in under 2 minutes.";
                } else if (lower.includes('oshin') || lower.includes('who') || lower.includes('nutritionist')) {
                    reply = "Oshin Ambekar is a certified Clinical Nutritionist (B.Sc., M.Sc. in Clinical Nutrition) with over 8 years of clinical experience. She specializes in local Indian home foods and has helped 500+ clients lead balanced lifestyles.";
                } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('address') || lower.includes('whatsapp')) {
                    reply = "You can call/WhatsApp Oshin's team at +91 98765 43210, email us at contact@nutrislims.com, or visit our clinic at Vijay Nagar, Indore, MP. Details are on contact.html!";
                }
                
                const botEl = document.createElement('div');
                botEl.className = 'chat-message bot-message';
                botEl.textContent = reply;
                chatbotBody.appendChild(botEl);
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
            }, 1000);
        });
    }

    /* ==========================================================================
       11. CLINIC DIET REPORT GENERATOR (STATIC FILE DOWNLOAD MOCK)
       ========================================================================== */
    const clinicalDropArea = document.getElementById('clinical-drop-area');
    const clinicalFileInput = document.getElementById('clinical-file-input');
    const clinicalUploadContent = document.getElementById('clinical-upload-content');
    const clinicalFilePreview = document.getElementById('clinical-file-preview');
    const clinicalFileName = document.getElementById('clinical-file-name');
    const clinicalFileRemoveBtn = document.getElementById('clinical-file-remove-btn');
    const btnGenerateReport = document.getElementById('btn-generate-clinical-report');
    
    if (clinicalDropArea && clinicalFileInput && btnGenerateReport) {
        let selectedFile = null;
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eName => {
            clinicalDropArea.addEventListener(eName, (e) => {
                e.preventDefault(); e.stopPropagation();
            });
        });
        ['dragenter', 'dragover'].forEach(eName => {
            clinicalDropArea.addEventListener(eName, () => clinicalDropArea.classList.add('dragover'));
        });
        ['dragleave', 'drop'].forEach(eName => {
            clinicalDropArea.addEventListener(eName, () => clinicalDropArea.classList.remove('dragover'));
        });
        
        clinicalDropArea.addEventListener('drop', (e) => setFile(e.dataTransfer.files));
        clinicalFileInput.addEventListener('change', function() { setFile(this.files); });
        
        function setFile(files) {
            if (files.length > 0) {
                const f = files[0];
                if (f.type.startsWith('image/') || f.type === 'application/pdf') {
                    selectedFile = f;
                    clinicalFileName.textContent = f.name;
                    clinicalUploadContent.classList.add('hidden');
                    clinicalFilePreview.classList.remove('hidden');
                    btnGenerateReport.disabled = false;
                    
                    document.getElementById('clinical-success-state').classList.add('hidden');
                    document.getElementById('clinical-error-state').classList.add('hidden');
                } else {
                    alert("Upload PDF or Image files only.");
                }
            }
        }
        
        function removeFile() {
            selectedFile = null;
            clinicalFileInput.value = '';
            clinicalUploadContent.classList.remove('hidden');
            clinicalFilePreview.classList.add('hidden');
            btnGenerateReport.disabled = true;
        }
        
        if (clinicalFileRemoveBtn) clinicalFileRemoveBtn.addEventListener('click', removeFile);
        
        btnGenerateReport.addEventListener('click', () => {
            if (!selectedFile) return;
            
            const loadingState = document.getElementById('clinical-loading-state');
            const progressFill = document.getElementById('clinical-progress-fill');
            const loadingText = document.getElementById('clinical-loading-text');
            const successState = document.getElementById('clinical-success-state');
            const errorState = document.getElementById('clinical-error-state');
            
            btnGenerateReport.classList.add('hidden');
            loadingState.classList.remove('hidden');
            successState.classList.add('hidden');
            errorState.classList.add('hidden');
            
            const stages = [
                { text: "Extracting Patient Form Data...", p: 25 },
                { text: "Analyzing Clinical Conditions...", p: 55 },
                { text: "Compiling 6-Meal Chart...", p: 85 },
                { text: "Formatting Word Report...", p: 100 }
            ];
            
            let currentStage = 0;
            progressFill.style.width = "5%";
            
            const timer = setInterval(() => {
                if (currentStage < stages.length) {
                    loadingText.textContent = stages[currentStage].text;
                    progressFill.style.width = `${stages[currentStage].p}%`;
                    currentStage++;
                } else {
                    clearInterval(timer);
                    
                    // Serve static docx file template
                    const downloadBtn = document.getElementById('clinical-download-link');
                    downloadBtn.href = "static/images/Clinical_Diet_Plan_Template.docx"; // Placed in images/ for easy packaging
                    downloadBtn.download = `Diet_Plan_${selectedFile.name.split('.')[0]}_Report.docx`;
                    
                    loadingState.classList.add('hidden');
                    successState.classList.remove('hidden');
                    btnGenerateReport.classList.remove('hidden');
                    btnGenerateReport.textContent = "Generate Another Plan";
                    removeFile();
                }
            }, 1000);
        });
    }

    /* ==========================================================================
       12. INTERSECTION OBSERVER FOR STATS & SCROLL REVEALS
       ========================================================================== */
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0 && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, selfObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const val = parseFloat(el.getAttribute('data-target'));
                    runCounter(el, val);
                    selfObserver.unobserve(el);
                }
            });
        }, { threshold: 0.15 }); // LOWERED THRESHOLD SO STATS ANIMATE RELIABLY
        
        stats.forEach(s => obs.observe(s));
        
        function runCounter(el, target) {
            let start = 0;
            const duration = 2000;
            const startTime = performance.now();
            const isFloat = !Number.isInteger(target);
            
            function step(timestamp) {
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const current = progress * (2 - progress) * target; // Ease out
                
                if (isFloat) {
                    el.textContent = current.toFixed(1) + '★';
                } else if (el.getAttribute('data-target') === '95') {
                    el.textContent = Math.floor(current) + '%';
                } else {
                    el.textContent = Math.floor(current) + '+';
                }
                
                if (progress < 1) requestAnimationFrame(step);
                else {
                    el.textContent = isFloat ? target.toFixed(1) + '★' : (el.getAttribute('data-target') === '95' ? target + '%' : target + '+');
                }
            }
            requestAnimationFrame(step);
        }
    } else if (stats.length > 0) {
        stats.forEach(el => {
            const v = el.getAttribute('data-target');
            el.textContent = v.includes('.') ? v + '★' : (v === '95' ? v + '%' : v + '+');
        });
    }

    // Scroll Reveal Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0 && 'IntersectionObserver' in window) {
        const revObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-reveal');
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(r => revObserver.observe(r));
    } else {
        reveals.forEach(r => r.classList.add('active-reveal'));
    }

    /* ==========================================================================
       13. INTERACTIVE WELLNESS SCORE CHECKLIST & CIRCULAR CHART
       ========================================================================== */
    const checklistItems = document.querySelectorAll('.wellness-checkbox');
    const scoreVal = document.getElementById('wellness-score-value');
    const scoreFeedback = document.getElementById('wellness-score-feedback');
    const progressFill = document.getElementById('wellness-progress-fill');
    
    if (checklistItems.length > 0 && scoreVal && scoreFeedback) {
        checklistItems.forEach(item => {
            item.addEventListener('change', calculateScore);
        });
        
        function calculateScore() {
            let total = 0;
            checklistItems.forEach(item => {
                if (item.checked) {
                    total += parseInt(item.getAttribute('data-points') || '0');
                }
            });
            
            // Animate number
            scoreVal.textContent = total;
            
            // Animate progress circle ring (Radius 75, Circumference = 471.2)
            if (progressFill) {
                const circumference = 471.2;
                const offset = circumference - (total / 100) * circumference;
                progressFill.style.strokeDashoffset = offset;
                
                // Shift colors dynamically
                if (total < 40) {
                    progressFill.style.stroke = "var(--error)";
                } else if (total < 70) {
                    progressFill.style.stroke = "var(--accent)";
                } else {
                    progressFill.style.stroke = "var(--primary)";
                }
            }
            
            if (total === 0) {
                scoreFeedback.textContent = "Start checking off items!";
                scoreFeedback.style.color = "var(--text-dark)";
            } else if (total < 40) {
                scoreFeedback.textContent = "Every healthy swap matters. Keep going! 🌱";
                scoreFeedback.style.color = "var(--error)";
            } else if (total < 70) {
                scoreFeedback.textContent = "Good job! You're building a strong foundation. 👍";
                scoreFeedback.style.color = "var(--accent)";
            } else if (total < 90) {
                scoreFeedback.textContent = "Excellent wellness score today! You're thriving. ⚡";
                scoreFeedback.style.color = "var(--primary-dark)";
            } else {
                scoreFeedback.textContent = "Phenomenal score! Oshin would be proud! 🏆";
                scoreFeedback.style.color = "var(--accent)";
            }
        }
        calculateScore(); // Run once to initialize
    }

    /* ==========================================================================
       14. FAQ ACCORDION COMPONENT
       ========================================================================== */
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const item = toggle.parentElement;
            const content = item.querySelector('.faq-content');
            
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item-glass').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-content').style.maxHeight = '0px';
            });
            
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       15. REAL-TIME 3D CARD TILT INTERACTION
       ========================================================================== */
    const tiltCards = document.querySelectorAll('.premium-3d-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const angleX = -(y - yc) / (yc / 10); // max 10 degrees tilt
            const angleY = (x - xc) / (xc / 10);
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
        });
    });
});
