import SomeContract from 0x05

pub fun main() {
  /**************/
  /*** AREA 4 ***/
  /**************/

    //access(Self)
    SomeContract.testStruct.d="Metacrafters Flow"
    let variableA = SomeContract.testStruct.d // Generate ERROR
    log(variableA)
}
