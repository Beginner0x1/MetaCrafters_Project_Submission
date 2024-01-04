import CryptoCoinRecord from 0x05

pub fun main(account: Address): CryptoCoinRecord.Record {
    return CryptoCoinRecord.coin[account]!
}
