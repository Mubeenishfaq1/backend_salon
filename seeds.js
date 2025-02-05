const Service=require('./models/Service.js')
// import Service from './models/Service.js';
const connectDb = require( "./connection.js");
const User = require( "./models/Users.js");
const bcrypt = require( 'bcryptjs');




(async function () {
  await connectDb();
  await User.deleteMany({});
  console.log("Database cleared");
  const adminSeed = [
    {
      name: "John",
      username: "johndoe",
      email: "admin@admin.com",
      password: await bcrypt.hash("admin@123", 10),
      role: "admin",
      phoneNumber: "1234567890",
      address: "123 Admin St",
    },
  ];

  const vaseSeed = [
    {
      name: "Hair Cut",
      price: "90",
      description: "Nail care and hand treatment",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738183856/ojagijkpx0ice4eutco3.jpg",
    },
    {
      name: "Blow Dry",
      price: 80,
      description: "Quick hair drying and styling",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738179976/d2smrgmro98hzlnh51bn.jpg",
    },
    {
      name: "Hair Up",
      price: 370,
      description: "Elegant updo for special occasions",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182106/fhv9emaebz0pswdstcuu.jpg",
    },
    {
      name: "Trimming",
      price: 40,
      description: "Hair ends trimming for freshness",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182966/ppsjg1m2zib9gzqhqqv3.jpg",
    },
    {
      name: "Fair Style",
      price: 120,
      description: "Beautiful, trendy, and stylish hair",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738180598/tyqooiomabco1qcq1yei.jpg",
    },
    {
      name: "Hair Style",
      price: 120,
      description: "Professional hair styling service",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181929/uqiiewcrmfdddx4prspt.jpg",
    },
    {
      name: "Roots Color",
      price: 130,
      description: "Color touch-up for hair roots",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182918/nqvrndywjicropjohdnj.jpg",
    },
    {
      name: "Hair Coloring",
      price: 130,
      description: "Full hair dyeing service",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182249/sofmvn2dcy4w22vwgwmy.jpg",
    },
    {
      name: "High or Low Lights Hair",
      price: 250,
      description: "Enhance hair with highlights/lowlights",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182396/pvei3i3f2f1tcquob0jv.jpg",
    },
    {
      name: "High or Low Lights Roots",
      price: 300,
      description: "Highlight or lowlight hair roots",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738183068/ygai78ntq3qisdi3quwc.jpg",
    },
    {
      name: "Blow Out",
      price: 1100,
      description: "Smooth, voluminous hair styling",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738180026/e5gaqmlbjo0gdkwv9wba.jpg",
    },
    {
      name: "Hair Botox",
      price: "300-400",
      description: "Deep hair treatment for smoothness",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738183769/epyyogskqdpxdpxzt24x.jpg",
    },
    {
      name: "Bridal Hair",
      price: 1500,
      description: "Elegant bridal hairstyle service",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738180144/eeyjugqwebmhuvyujmst.jpg",
    },
    {
      name: "Bridal Makeup",
      price: 1500,
      description: "Flawless makeup for brides",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738180067/vywaj3kdlyjwlkktsytr.jpg",
    },
    {
      name: "Eye Lash Extensions",
      price: 260,
      description: "Long-lasting, fuller lash extensions",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738180440/kayegbi2lzizlmxp07bt.jpg",
    },
    {
      name: "Full Legs Waxing",
      price: 110,
      description: "Smooth and hair-free legs",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738183584/uwbex6bc3ryqjyrajr4g.jpg",
    },
    {
      name: "Half Legs Waxing",
      price: 80,
      description: "Removes unwanted hair mid-leg",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738183696/jskdohviwyuhurmwjxiw.jpg",
    },
    {
      name: "Hair Extension",
      price: 80,
      description: "Adds volume and length",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181755/lmlt824655amhwz31znj.jpg",
    },
    {
      name: "Hair Treatment",
      price: "150-350",
      description: "Nourishing treatment for healthy hair",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182035/syk9emjwsan3osqrcqjh.jpg",
    },
    {
      name: "Hair Straightening",
      price: 560,
      description: "Permanent or temporary hair straightening",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181841/f2thugckjmxilnznriy1.jpg",
    },
   {
          name: "Eye Lash Extensions with Eye Liner",
          price: 170,
          description: "Enhances lashes with defined liner",
          images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738183213/jwxkawq73ygkp7v6nix9.jpg"
    },
      {
      name: "Perm Lashes",
      price: 225,
      description: "Creates long-lasting curled lashes",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182737/y2jmcoharinvlkpskko8.jpg"
    },
    {
        name: "Eye Lash Coloring",
        price: 250,
        description: "Darkens lashes for a bolder look",
        images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738180286/pimilky7othqxvnbsatv.jpg"
    },
    {
      name: "Make Up",
      price: 370,
      description: "Professional makeup for any occasion",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182465/ncujrbrsj4bzquuribdh.jpg",
    },
    {
      name: "French Pedicure",
      price: 120,
      description: "Classic pedicure with white tips",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738184135/zstuflstahatnhdzkz6t.jpg",
    },
    {
      name: "French Manicure",
      price: 120,
      description: "Elegant nails with white tips",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181096/yxt4ixunizdsjkiedqui.jpg",
    },
    {
      name: "Pedicure",
      price: 100,
      description: "Foot care and nail grooming",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182311/qogaenhw5cgjrhswg2jx.jpg",
    },
    {
      name: "Polish Change",
      price: 20,
      description: "Quick nail polish refresh",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182842/bgbvgv3im8jbnfsmrh09.jpg",
    },
    {
      name: "Acrylic",
      price: 260,
      description: "Durable acrylic nail extensions",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738179892/gq4zccktnxjuk2rhsgfk.jpg",
    },
    {
      name: "Gelish Removal",
      price: 40,
      description: "Safe removal of gel polish",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181649/bnyjno39hjzohxzib6cc.jpg",
    },
    {
      name: "Eye Lashes 1*1",
      price: 250-300,
      description: "Individually applied for natural volume",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738180371/l75f8pr9n6jdbddstg37.jpg",
    },
    {
      name: "Full Arm",
      price: 150-350,
      description: "Removes hair for smooth arms",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738183938/hllpg0th1ylusv9kvg0r.jpg",
    },
    {
      name: "Half Arm",
      price: 150-350,
      description: "Removes hair from lower arm",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182173/wjabmuubwzlwkhgcp0o3.jpg"
    },
    {
      name: "Under Arm",
      price: 20,
      description: "Removes underarm hair smoothly.",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738183011/igwirza0hfvraaqm85du.jpg"
    },
    {
      name: "full Body",
      price: 300,
      description: "Complete hair removal for body",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181271/snq8isqpniozwlufsjuk.jpg",
    },
    {
      name: "Eye Brow Threading",
      price: 30,
      description: "Shapes eyebrows with precise threading",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738184018/thp16ugr3otxgrlknssg.jpg",
    },
    {
      name: "Upper Lip Threading",
      price: 20,
      description: "Removes unwanted hair from upper lip",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738184018/thp16ugr3otxgrlknssg.jpg",
    },
    {
      name: "Eye Brow & Upper lip Threading",
      price: 40,
      description: "Shapes eyebrows and upper lip hair",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738180215/x4hrtuhdmlmgvipvwrc9.jpg",
    },
    {
      name: "Full Face Threading",
      price: 80,
      description: "Precise hair removal for entire face",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738180537/ko6wu3rfk35a1rwu18tb.jpg",
    },
    {
      name: "Bikini Line",
      price: 60,
      description: "Removes hair along bikini area",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738184135/zstuflstahatnhdzkz6t.jpg",
    },
    {
      name: "Manicure",
      price: 100,
      description: "Treats and shapes fingernails beautifully",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182612/p9ixnjzwbx3ril93uyoc.jpg",
    },
    {
      name: "French Manicure & Pedicure",
      price: 180,
      description: "Classic French style for hands and feet",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181044/zr1x1gvzcc2csonne9gj.jpg",
    },
    {
      name: "French Polish Change",
      price: 55,
      description: "Refreshes nails with French polish",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181230/gmvqxgpzjyk3s7zgj3vx.jpg",
    },
    {
      name: "Gelish Manicure",
      price: 200,
      description: "Long-lasting gel polish for nails",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181557/k7ugut6pfzkq5jxudl71.jpg",
    },
    {
      name: "Gelish Pedicure",
      price: 200,
      description: "Durable gel polish for toes",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181599/uigtzd883dcnlvhbc4ml.jpg",
    },
    {
      name: "Gelish French Manicure",
      price: 130,
      description: "French tips with gel polish",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181414/qo2s7qcm5t064cwq5ujw.jpg",
    },
    {
      name: "Gelish French Pedicure",
      price: 150,
      description: "French tips with gel pedicure",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181465/oh5e6eq71n2htb3tobld.jpg",
    },
    {
      name: "Gelish French Mani and Pedicure",
      price: 330,
      description: "French gel manicure and pedicure",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181507/scpqxbufue5qbflkygky.jpg",
    },
    {
      name: "Gelish Extention",
      price: 260,
      description: "Adds length with gel extensions",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738181365/bb53luoexlcvjnfikooe.jpg",
    },
    {
      name: "Fake Nails",
      price: 60,
      description: "Artificial nails for instant length",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738180731/agerpoaluecj16z1k93b.jpg",
    },
    {
      name: "Nail Repair",
      price: 35,
      description: "Fixes chipped or broken nails.",
      images: "https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182697/nphrmzzhbwpp2emxck4x.jpg",
    },
  ];
  
 
  // await User.insertMany(adminSeed);
  await Service.insertMany(vaseSeed);

  console.log("Admins seeded");
  process.exit(1);
})();