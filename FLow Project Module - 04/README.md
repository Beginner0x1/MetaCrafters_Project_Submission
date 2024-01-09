## Project Introduction 


In AREA 1, we find the contract declaration with four variables (a, b, c, d) and three functions (publicFunc, contractFunc, privateFunc). Variable 'a' is private, 'b' is internal, 'c' is public, and 'd' is internal. As for functions, 'publicFunc' is a public function, 'contractFunc' is internal, and 'privateFunc' is not defined yet.

Moving to AREA 2, within the 'publicFunc' function, variables 'a', 'b', 'c', and 'd' are readable and writable, as they have at least internal visibility. The 'publicFunc' function itself can be called externally.

In AREA 3, the 'contractFunc' function is defined with internal visibility, making it readable and writable for variables 'a', 'b', 'c', and 'd'. This function can be called internally within the contract but is not accessible externally.

Finally, in AREA 4, the 'privateFunc' function is not present in the provided code snippet, so its read and write scopes cannot be determined. Ensure its visibility is specified when implemented.



## Code - Contract Explanation 

```cadence
access(all) contract SomeContract {
// This contract defines a SomeContract resource and a SomeStruct struct.
    // The testStruct variable is of type SomeStruct.
    
    pub var testStruct: SomeStruct

    // SomeStruct struct definition
    pub struct SomeStruct {

        //
        // 4 Variables
        //

        // Read and write scope in Areas 1, 2, 3, and 4
        pub(set) var a: String

        // Read scope in Areas 1, 2, 3, and 4; Write scope in Area 1 only
        pub var b: String

        // Read scope in Areas 1, 2, and 3; Write scope in Area 1 only
        access(contract) var c: String

        // Read and write scope in Area 1 only
        access(self) var d: String

        //
        // 3 Functions
        //

        // Can be called in Areas 1, 2, 3, and 4
        pub fun publicFunc() {}

        // Can be called in Areas 1, 2, and 3; Access is within the contract only
        access(contract) fun contractFunc() {}

        // Can be called in Area 1 only; Access is within the struct only
        access(self) fun privateFunc() {}

        // Example function within the struct
        pub fun structFunc() {
            /**************/
            /*** AREA 1 ***/
            /**************/
        }

        init() {
            self.a = "a"
            self.b = "b"
            self.c = "c"
            self.d = "d"
        }
    }

    // Resource definition
    pub resource SomeResource {
        pub var e: Int

        // Example function within the resource
        pub fun resourceFunc() {
            /**************/
            /*** AREA 2 ***/
            /**************/
        }

        init() {
            self.e = 17
        }
    }

    // Function to create an instance of SomeResource
    pub fun createSomeResource(): @SomeResource {
        return <- create SomeResource()
    }

    // Example function within the contract
    pub fun questsAreFun() {
        /**************/
        /*** AREA 3 ****/
        /**************/
    }

    // Initialization of the contract, initializing testStruct
    init() {
        self.testStruct = SomeStruct()
    }
}
```


The specified line denotes that the contract, named SomeContract, possesses access to all areas within the blockchain, implying the ability to both read and write data across all available areas. Within the contract, a public variable named testStruct is declared, its type specified as SomeStruct. The ensuing variables, a through d, are also declared within the contract, each with varying levels of read and write access across Areas 1, 2, 3, and 4. The functions publicFunc, contractFunc, and privateFunc are defined, each with specific accessibility and operational restrictions based on the designated areas and the contract or struct itself. Additionally, a function structFunc is exemplified within the struct, marked with a comment detailing its operation in Area 1. The init function is implemented to initialize variables within the struct and contract. Furthermore, a public variable e of type Int is declared within the SomeResource resource, accompanied by the resourceFunc function, and an init function initializing the resource's variable. Lastly, a public function createSomeResource is declared within the contract, facilitating the creation and return of a new SomeResource instance using the create keyword. 
The questsAreFun function, housed within the contract, is annotated with a comment elucidating its operation in Area 3, and the init function initializes the contract by setting the initial value of the testStruct variable through the creation of a new SomeStruct instance.


