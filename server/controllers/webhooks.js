import { Webhook } from "svix";
import User from "../models/User.js"



//API Controlled function to manage clerk user with database

export const clerkWebhooks = async (req, res) => {
  
  try {
    console.log("testing yash",process.env.CLERK_WEBHOOK_SECRET)
    const key = process.env.CLERK_WEBHOOK_SECRET;
    // const whook = new Webhook(key);
    // console.log("testing",CLERK_WEBHOOK_SECRET)
    // await whook.verify(JSON.stringify(req.body), {
    //   "svix-id": req.headers["svix-id"],
    //   "svix-timestamp": req.headers["svix-timestamp"],
    //   "svix-signature": req.headers["svix-signature"]
    // })
    const whook = new Webhook(key);

await whook.verify(req.body, {
  "svix-id": req.headers["svix-id"],
  "svix-timestamp": req.headers["svix-timestamp"],
  "svix-signature": req.headers["svix-signature"]
});

     console.log("🔔 Webhook received:", req.body);
    const { data, type } = req.body;
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData); // this stores the data on mongodb database
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case 'user.deleted':{
        await User.findByIdAndDelete(data.id)
        res.json({})
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log("testing error",error)
    res.json({success: false, message:error.message})
  }
};
