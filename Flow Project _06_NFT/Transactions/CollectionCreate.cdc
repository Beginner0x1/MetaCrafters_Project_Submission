import CryptoPoops from 0x05

transaction() {

  prepare(signer: AuthAccount) {
 
    if signer.borrow<&CryptoPoops.Collection>(from: /storage/CryptoPoopsCollection) != nil {
      log("Sir You've Already Created Collection, Sorry")
      return
    }

    signer.save(<- CryptoPoops.createEmptyCollection(), to: /storage/CryptoPoopsCollection)

    signer.link<&CryptoPoops.Collection>(/public/CryptoPoopsCollection, target: /storage/CryptoPoopsCollection)

    log("Sir You're collection were Created")
  }
}
