export interface Plant {
    species: String,
    growthStatus:String,
    healthStatus:Number,
    tempStatus:Number,
    lightStatus:Number,
    moistStatus:Number,
    isUserPlant:Boolean,
    defaultPhotoID: String, 
    irrigationInstructors:String, // celsius
    
    optimalTemp: Number,
    
    optimalSunExposure: Number,
    
    optimalSoilMoisture: Number,
    
     
    description:String,
    sensorID: String,
    photos:[],  
    GardenID:String,
    lastIrrigation: Date,
    lastTemp:{ value: Number , date: Date},
    lastLight:{ value: Number, date: Date},
    lastSoil:{ value: Number, date: Date}
    
}