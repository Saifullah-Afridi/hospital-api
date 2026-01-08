const User = require("./user.modelUser");

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
 
  try {
    
  
    const isUser = await User.findOne({ email });
    if(isUser){
        return res.status(400).json({message:"User already exist"})
    }

    
    const newUser = await User.create({
        name,email,password
    })


    newUser.password = undefined
    res.status(201).json({message:"User has been created successfully",newUser)
} catch (error) {
   res.status(500).json({message:error.message}) 
  }  
};
