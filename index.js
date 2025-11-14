const { chromium } = require('playright');

const runAudit = async (url) => {
    const browser = await chromium.launch({headless: true});
    const page = await browser.newPage();

    //Acessar a página 

    const response = await page.goto(url, {waitUntil: 'networkidle'});

    //Status code
    const status = response.status();
    console.log('status: ', status);

    //Meta robots

    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute('content');
    console.log('Meta Robots: ', robotsMeta);

    // title

    const title = await page.title();
    console.log('Title: ', title);

    //Coletar canonical 

    const canonicals = await page.locator('link[rel="canonical"]');

    // Quantidade detectada

    console.log('Canonical tags: ', canonicals.length);

    if(canonicals === 1) {
        const cannonicalHref = await canonicals[0].getAttribute('href');
        console.log('Canonical href: ', cannonicalHref); 
    } else if(canonicals.length === 0) {
        console.log("⚠ Nenhum canonical encontrado");
    } else {
        console.log("❌ Canonical duplicado — problema crítico");
    }

}

runAudit()