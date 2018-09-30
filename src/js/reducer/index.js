// Reducer

export default function (state=0, action){

  if(action.type == 0){
    return state + 1;
  }
  else{
    return state - 1;
  }

}