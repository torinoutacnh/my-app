import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import { ConnectionContextState, WalletContextState } from "@solana/wallet-adapter-react";

// system seed
const secrectKey = (process.env.REACT_APP_SYSTEM_KEYPAIR || "").split(",");
var arrayOfNumbers = secrectKey.map(Number);
// system keypair
export const systemAddress = web3.Keypair.fromSecretKey(
    Uint8Array.from(arrayOfNumbers)
);

export const sftAddress = new web3.PublicKey(process.env.REACT_APP_SFT_TOKEN_CREATOR || "");
export const smwAddress = new web3.PublicKey(process.env.REACT_APP_SMW_TOKEN_CREATOR || "");

// create NFT token
export const NFTToken = (connection: web3.Connection, nftAddress: String) => {
    const nftPubley = new web3.PublicKey(nftAddress);
    return new splToken.Token(
        connection,
        nftPubley,
        splToken.TOKEN_PROGRAM_ID,
        systemAddress
    );
};
// create SFT token
export const SFTToken = (connection: web3.Connection) => {
    return new splToken.Token(
        connection,
        sftAddress,
        splToken.TOKEN_PROGRAM_ID,
        systemAddress
    );
};
// create SMW token
export const SMWToken = (connection: web3.Connection) => {
    return new splToken.Token(
        connection,
        smwAddress,
        splToken.TOKEN_PROGRAM_ID,
        systemAddress
    );
};
// transfer sol instrucction
export const solInstruction = (from: web3.PublicKey, to: web3.PublicKey, amount = 0) => {
    var instruction = web3.SystemProgram.transfer({
        fromPubkey: from,
        toPubkey: to,
        lamports: web3.LAMPORTS_PER_SOL * amount, // 1 Sol
    });
    return instruction;
};
// transfer token instrucction
export const tokenInstruction = (
    fromTokenAccount: splToken.AccountInfo,
    toTokenAccount: web3.PublicKey,
    from: web3.PublicKey,
    amount = 0
) => {
    const transfer = amount === 0 ? new splToken.u64(1) : (web3.LAMPORTS_PER_SOL * amount)
    const instruction = splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount,
        from,
        [],
        transfer
    )
    return instruction;
};
// transfer token
export const transferTokenInstruction = async (
    fromPublickey: web3.PublicKey,
    toPublickey: web3.PublicKey,
    connection: web3.Connection,
    tokenMinterPublickey: web3.PublicKey,
    amount: number = 0
) => {
    var instructions = [];
    // Construct my token class
    const customToken = new splToken.Token(
        connection,
        tokenMinterPublickey,
        splToken.TOKEN_PROGRAM_ID,
        systemAddress
    );
    // Create associated token accounts for my token if they don't exist yet
    const fromTokenAccount = await customToken.getOrCreateAssociatedAccountInfo(
        fromPublickey
    );
    const toTokenAccount = await splToken.Token.getAssociatedTokenAddress(
        customToken.associatedProgramId,
        customToken.programId,
        customToken.publicKey,
        toPublickey
    );
    const receiverAccount = await connection.getAccountInfo(toTokenAccount);
    if (receiverAccount === null) {
        instructions.push(
            splToken.Token.createAssociatedTokenAccountInstruction(
                customToken.associatedProgramId,
                customToken.programId,
                tokenMinterPublickey,
                toTokenAccount,
                toPublickey,
                fromPublickey
            )
        );
    }
    // make token transfer instruction
    var tokeninstruction = tokenInstruction(
        fromTokenAccount,
        toTokenAccount,
        fromPublickey,
        amount
    );
    instructions.push(tokeninstruction);
    return instructions;
};
// create and sign transaction
export const makeTransaction = async (
    wallets: WalletContextState,
    connection: web3.Connection,
    instructions: web3.TransactionInstruction[],
    isPartialSign = false
) => {
    try {
        const transaction = new web3.Transaction().add(...instructions);
        // Setting the variables for the transaction
        transaction.feePayer = wallets.publicKey || undefined;
        let blockhashObj = await connection.getRecentBlockhash();
        transaction.recentBlockhash = await blockhashObj.blockhash;
        // Transaction constructor initialized successfully
        if (transaction) {
            console.log("Txn created successfully");
        }
        // Request creator to sign the transaction (allow the transaction)
        let signed = await wallets.signTransaction(transaction);
        // The signature is generated
        if (isPartialSign) {
            transaction.partialSign(...[systemAddress]);
        }
        let signature = await connection.sendRawTransaction(signed.serialize());
        // Confirm whether the transaction went through or not
        await connection.confirmTransaction(signature);

        //Signature chhap diya idhar
        console.log("Signature: ", signature);
    } catch (error) {
        console.log(error);
    }
};
// get token info from wallet
export const getCustomToken = async (connection: web3.Connection, tokenMintPubkey: web3.PublicKey, from: web3.PublicKey) => {
    try {
        // Construct my token class
        var customToken = new splToken.Token(
            connection,
            tokenMintPubkey,
            splToken.TOKEN_PROGRAM_ID,
            systemAddress
        );
        // Create associated token accounts for my token if they don't exist yet
        var fromTokenAccount = await customToken.getOrCreateAssociatedAccountInfo(
            from
        );

        const myWalletMyTokenBalance = await connection.getTokenAccountBalance(
            fromTokenAccount.address
        );
        console.log("myWalletMyTokenBalance : ", myWalletMyTokenBalance);
        return myWalletMyTokenBalance;
    } catch (error) {
        console.log(error);
    }
}
// get Sol price
export const getSolPrice = async () => {
    const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`,
        {
            method: "GET",
        }
    );

    const data = await response.json();
    return data.solana.usd;
};
// mint nft
export const mintSplToken = async (connection: web3.Connection, fromWallet: web3.Keypair) => {
    //create new token mint
    let mint = await splToken.Token.createMint(
        connection,
        fromWallet,
        fromWallet.publicKey,
        null,
        9,
        splToken.TOKEN_PROGRAM_ID,
    );

    //get the token account of the fromWallet Solana address, if it does not exist, create it
    let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
        fromWallet.publicKey,
    );

    //minting 1 new token to the "fromTokenAccount" account we just returned/created
    await mint.mintTo(
        fromTokenAccount.address, //who it goes to
        fromWallet.publicKey, // minting authority
        [], // multisig
        web3.LAMPORTS_PER_SOL, // how many
    );
    //revoke minting privileges and ensure that we can not create additional tokens of this type : null
    await mint.setAuthority(
        mint.publicKey,
        null,
        "MintTokens",
        fromWallet.publicKey,
        []
    )
}
// buy with sft
export const buyBySFT = async (endpoint: ConnectionContextState, wallets: WalletContextState, tokenmint: string, amount: number) => {
    try {
        const instruction: web3.TransactionInstruction[] = [];

        const mintPubkey = new web3.PublicKey(tokenmint);
        const transferNFT = await transferTokenInstruction(systemAddress.publicKey, wallets.publicKey, endpoint.connection, mintPubkey, 0);
        instruction.push(...transferNFT);
        const transferSFT = await transferTokenInstruction(wallets.publicKey, systemAddress.publicKey, endpoint.connection, smwAddress, amount);
        instruction.push(...transferSFT);
        await makeTransaction(wallets, endpoint.connection, instruction, true);
    } catch (error) {
        console.log(error);
    }
}