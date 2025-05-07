export class GlobalState {
    private static instance: GlobalState;
  
   
    private constructor() {
     
    }
  
    public static getInstance(): GlobalState {
      if (!GlobalState.instance) {
        GlobalState.instance = new GlobalState();
      }
      return GlobalState.instance;
    }
  
   
  }
  
  
  