import { test,request, expect} from '@playwright/test';
import { Pet } from './model/pet';
import { petTestData } from './petstore-apidata';

const APIBASEURL='https://petstore.swagger.io/v2';
test.describe(`User manages pets using petstore API`,async()=>{
    let newPetId:number;
    test(`User should be able to submit a new pet with a post request`,async({request})=>{
        const petName=petTestData.name;
        const newPet=await request.post(`${APIBASEURL}/pet`,{data:petTestData});
        expect(await newPet.status()).toBe(200);
        const respBody=JSON.parse(await newPet.text());
        console.log(respBody);
        newPetId=respBody.id;
        console.log(`new pet id: ${newPetId}`);
        expect(respBody.name).toBe(`${petName}`);
 });

 test(`User should be able to find pets with status with a get request`,async({request})=>{
    const pets=await request.get(`${APIBASEURL}/pet/findByStatus`,{params:{"status":"available"}});
    expect(await pets.status()).toBe(200);
    const respBody=JSON.parse(await pets.text());
    console.log(respBody[0].id);

});

 test(`User should be able to get a new pet with a get request`,async({request})=>{
    //find an available pet
    const allPets=await request.get(`${APIBASEURL}/pet/findByStatus`,{params:{"status":"available"}});
    expect(await allPets.status()).toBe(200);
    const pets :Pet[] =JSON.parse(await allPets.text());
    let petIdToTest: number=0;
    for(let i=0;i<pets.length;i++){
        if(pets[i].id.toString().length<=8)
        {
            petIdToTest=pets[i].id;
            console.log(`pet to get: ${petIdToTest}`)
            break;
        }
    }

    const newPet=await request.get(`${APIBASEURL}/pet/${petIdToTest}`);
    expect(await newPet.status()).toBe(200);
    const respBody=JSON.parse(await newPet.text());
    console.log(respBody);
});

test(`User should be able to update an existing pet with a put request`,async({request})=>{
    //get available pet
     //find an available pet
     const allPets=await request.get(`${APIBASEURL}/pet/findByStatus`,{params:{"status":"available"}});
     expect(await allPets.status()).toBe(200);
     const pets :Pet[] =JSON.parse(await allPets.text());
     let petIdToTest: number=0;
     for(let i=0;i<pets.length;i++){
         if(pets[i].id.toString().length<=6)
         {
             petIdToTest=pets[i].id;
             console.log(`pet to get: ${petIdToTest}`)
             break;
         }
     }
    const newPetName='mycutedog123';
    const petInfo={
        id: petIdToTest,
        category: { id: 0, name: 'doggie' },
        name: `${newPetName}`,
        photoUrls: [ 'https://www.dogs.com/doggie123.html' ],
        tags: [ { id: 0, name: 'dog' } ],
        status: 'available'
      };
    const updatedPet=await request.put(`${APIBASEURL}/pet`,{data:petInfo});
    expect(await updatedPet.status()).toBe(200);
    const respBody=JSON.parse(await updatedPet.text());
    console.log(respBody);
    expect(respBody.name).toBe(`${newPetName}`);
});

test(`User should be able to delete a pet with a delete request`,async({request})=>{
    const petsToDelete=await request.get(`${APIBASEURL}/pet/findByStatus`,{params:{"status":"available"}});
    expect(await petsToDelete.status()).toBe(200);
    const pets :Pet[] =JSON.parse(await petsToDelete.text());
    
    let petIdToDelete: number=0;
    for(let i=0;i<pets.length;i++){
        if(pets[i].id.toString().length<=5)
        {
            petIdToDelete=pets[i].id;
            console.log(`pet to get: ${petIdToDelete}`)
            break;
        }
    }
    const petResponse=await request.delete(`${APIBASEURL}/pet/${petIdToDelete}`);
    expect(petResponse.status()).toBe(200);
});

})