import NonFungibleToken from 0x05
import CryptoPoops from 0x05

pub fun main(acctAddress: Address): [UInt64] {
    
    let pubRef = getAccount(acctAddress).getCapability(/public/CryptoPoopsCollection)
                    .borrow<&CryptoPoops.Collection{NonFungibleToken.CollectionPublic}>()
                    ?? panic("No collection associated with the address.")

    return pubRef.getIDs()
}
