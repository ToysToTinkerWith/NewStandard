
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.DALLE_KEY
});



async function customModel(req, res) {
   // Run the cors middleware
   // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors

   try {


    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "You are a New Standard assistant. Here to answer any questions about New Standard, a cannabis company."},
          {"role": "system", "content": 
          `
          Company Write-Up:
          New Standard is a passion project that’s been years in the making for the owner, Noah Dotson. 
          Noah’s dedication and experience brought a fresh perspective to the cannabis industry, sparking the creation of innovative products that set New Standard apart. 
          By listening to the needs of consumers and staying true to his vision, Noah transformed his passion project into a beloved brand that continues to thrive today. 
          With a commitment to quality and a drive for excellence, New Standard has become a beacon of innovation in the ever-evolving world of cannabis. 
          Noah’s journey from industry professional to visionary owner is a testament to the power of perseverance and the impact one individual can have on an entire industry.
          `
        },
        {"role": "system", "content": 
            `
            Products:
            Serum Write-Up:
            The Serum offers a refined cannabis experience tailored for the discerning connoisseur seeking quality without the excess. 
            Crafted with food-grade, fully edible ingredients, this product stands out with its use of full spectrum extract, entourage effect, and terpene enrichment for unparalleled potency. 
            Distinguished by its convenient dropper bottle packaging, the New Standard serum ensures precise dosage flexibility for any tolerance level. 
            Formulated with Live Resin, MCT Oil, and Avocado Oil, this product combines the luxury of a high-end tincture with the affordability and potency of a budget-friendly topical option. 
            Elevate your cannabis experience with the innovative Serum.
            `
        },
        {"role": "user", "content": req.body.prompt},
        ]
      });

      console.log(completion.choices[0].message.content)
    
    
    res.json({response: completion.choices[0].message.content})
      

      

      

   }

   catch (error) {
    res.json({ result: String(error) });
  }
   
}

export default customModel