import CryptoCoinRecord from 0x05

transaction(token_name: String, token_owner: String, token_id: String, token_value: Int, account: Address)
{
    prepare(signer:AuthAccount)
    {

    }
    execute
    {
        CryptoCoinRecord.newRecord(token_name: token_name, sector: token_owner, token_id: token_id, token_value: token_value, account: account)
        log("Details Stored")
    }
}
