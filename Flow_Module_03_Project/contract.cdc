pub contract CryptoCoinRecord {

    pub var coin: {Address: Record}

    pub struct Record {

        pub let token_name: String
        pub let token_owner: String
        pub let token_id: String
        pub let token_value: Int
        pub let account: Address

        init(_token_name: String, _token_owner: String, _token_id: String, _token_value: Int, _account: Address) {

            self.token_name = _token_name
            self.token_owner = _token_owner
            self.token_id = _token_id
            self.token_value = _token_value
            self.account = _account
        }
    }

    pub fun newRecord(token_name: String, token_owner: String, token_id: String, token_value: Int, account: Address) {
        let newcoin = Record(_token_name: token_name, _token_owner: token_owner, _token_id: token_id, _token_value: token_value, _account: account)
        self.coin[account] = newcoin
    }

    init() {
        self.coin = {}
    }
}
