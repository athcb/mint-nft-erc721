const { ethers } = require("hardhat");

async function main() {

    const PomegranateDream = await ethers.getContractFactory("PomegranateDreamNFT");
    const pdream = await PomegranateDream.deploy()
    await pdream.waitForDeployment();

    console.log("NFT deployed to: ", pdream.target);

    const signer = await ethers.provider.getSigner();

    await pdream.safeMint(signer.getAddress(), "ipfs://QmXWVBJvH1o5h7Girv9zxirNG2w4rJzwzELAokVPsmSGTt");
    console.log("PDREAM NFT minted!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })