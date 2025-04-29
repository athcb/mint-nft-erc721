require("dotenv").config();

async function run() {
    
    const { create } = await import('ipfs-http-client');
    const ipfs = await create({
        url: 'http://127.0.0.1:5001/api/v0'
    });
    
    
    // we added three attributes, add as many as you want!
    const metadata = {
        path: '/',
        content: JSON.stringify({
            name: "Pomegranate Face Cream",
            attributes: [
            {
                "trait_type": "Texture",
                "value": "Creamy & light" 
            },
            {
                "trait_type": "Scent",
                "value": "Refreshing"
            },
            {
                "trait_type": "Mood",
                "value": "Luxurious"
            },
            {
                "trait_type": "Occasion",
                "value": "Self-care"
            }
            ],
            // update the IPFS CID to be your image CID
            image: "https://ipfs.io/ipfs/QmZrp8HbNCJ9NbvivaQZ5G9Us9ByRrMGzNgguS8CX98hRK",
            description: "A luxurious and creamy face cream, enriched with the essence of pomegranate"
        })
    };

    const result = await ipfs.add(metadata);
    console.log(result);

     // Add to MFS so it's visible in Files tab
    await ipfs.files.cp(`/ipfs/${result.cid}`, `/face-cream-metadata.json`);
    console.log('Metadata added to IPFS MFS!');

    process.exit(0);
}

run();