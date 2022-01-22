import * as web3 from "@solana/web3.js";
import * as metadata from "@metaplex-foundation/mpl-token-metadata";

const marketAddress = process.env.REACT_APP_NFT_ADDRESS || "";

export const getWalletNFTs = async (connection: web3.Connection, ownerPublickey: web3.PublicKey) => {
    const nftsmetadata = await metadata.Metadata.findDataByOwner(connection, ownerPublickey);
    return nftsmetadata;
};

export const getMetadataDetail = async (metadatadata: metadata.MetadataData) => {
    const res = await fetch(metadatadata.data.uri);
    return res.json();
}