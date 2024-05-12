const InterviewTable = require('../model/InterviewTable');


exports.createObject = async(req,res)=>{
    try {
        const {
            username,status
        } = req.body 
        if(!(
            username && status 
            )){
                return res.status(400).send({message : "All field must be filled compulsory"})
            }
            const addObject = await InterviewTable.create({username,status}) 
            return res.status(200).send({"message": "Object added successfully"})
    } catch (error) {
        return res.status(400).send({"error":error.message})
    }
}

exports.viewObject = async(req,res)=>{
    try {
        const reqBody = req.body
        
        const exist = await InterviewTable.find({});
        if(!exist){
            return res.status(400).send({message:"No objects were found"})
        }
        console.log(exist)
        return res.status(200).send({data:exist})
    } catch (error) {
        return res.status(400).send({"error":error.message})
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const _id = req.params._id; // Extract _id from request parameters
        const {status,feedback,rating} = req.body; // Extract status from request body
        //console.log(data);

        if (!_id) {
            return res.status(400).send({ message: "_id required" });
        }

        // Find the interview table entry by _id
        const exist = await InterviewTable.findById(_id);
        
        if (!exist) {
            return res.status(404).send({ message: "Object not found" });
        }

        // Update the status
        exist.status = status;
        exist.feedback = feedback;
        exist.rating = rating;

        // Save the updated entry
        const updatedEntry = await exist.save();

        return res.status(200).send({ message: "Status updated successfully", data: updatedEntry });
    } catch (error) {
        console.error("Error updating status:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

exports.deleteObject = async (req, res) => {
    try {
        const _id = req.params._id; // Extract _id from request parameters

        if (!_id) {
            return res.status(400).send({ message: "_id required" });
        }

        // Find the interview table entry by _id
        const entryToDelete = await InterviewTable.findById(_id);

        if (!entryToDelete) {
            return res.status(404).send({ message: "Object not found" });
        }

        // Delete the entry
       const deleteEntry = await entryToDelete.deleteOne();

        return res.status(200).send({ message: "Entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting entry:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

