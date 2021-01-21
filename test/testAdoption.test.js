const Adoption = artifacts.require("Adoption");

contract("Adoption", ([adopter]) => {
    let adoption;
    let expectedPetId;
    const petId = 8;

    before(async () => {
        adoption = await Adoption.deployed();
    })

    describe("adapting a pet and get account address", async () => {
        before("Adopt a pet using adopter account", async () => {
            await adoption.adopt(petId, { from: adopter });
        })

        it('can fetch the address of adopter by pet Id', async () => {
            const petOwner = await adoption.adopters(petId);
            assert.equal(petOwner, adopter, "The owner of the adopted pet is same")
        });

        it('can fetch the collection of adopters', async () => {
            const adopters = await adoption.getAdopters();
            assert.equal(adopters[petId], adopter, "The owner of the adopted pet is same")
        });
    });
});