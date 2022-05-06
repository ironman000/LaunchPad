console.log(navigator);
if (navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success, failure);
}
function updateDevices(event){
    console.log(event);
}
function failure(){
    console.log('Could not connect MIDI');
}
function success(midiAccess){
   // console.log('midiAccess');
    midiAccess.addEventListener('statechange', updateDevices);
    const inputs = midiAccess.inputs;
    //console.log(inputs);

    inputs.forEach((input) => {
        console.log(input);
        input.addEventListener('midimessage', handleInput);
    })
}
function handleInput(input){
    //console.log(inputs);
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];


   // console.log(`command: ${command}, note: ${note}, velocity: ${velocity}`)

   switch (command){
       case 144:
           if (velocity > 0){
               noteOn(note);   
           }else {
                   noteOff(note);
               }
               break;
           
   }
}

//note functions (color and changes)
function noteOn(note){
    console.log(`note: ${note} //on`);
    if (note == 99){
        document.getElementById("testelm").innerHTML = "Note 99 is on"
        colorKeys(65, 40);
    }
    if (note == 99){
        colorKeys(0)
    }
}
function noteOff(note){
    console.log(`note: ${note} //off`);
    if (note == 99){
        document.getElementById("testelm").innerHTML = "Back to Normal"
    }
}
function colorKeys(key, clr) {
    device && device.send([0x90, key, clr]); //note on
}
function clearAll(){
    for (let i = 0; i < 100; i++){
        colorKeys(i, i)
    }
}

