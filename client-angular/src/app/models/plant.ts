export interface Plant {
    _id: String,
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
    photos: Array<String>,  
    GardenID: String,

    lastIrrigation: Date,
    lastTemp: Object,
    lastLight: Object,
    lastSoil:Object,

    created: Date,
    lastUpdated: Date,   
}