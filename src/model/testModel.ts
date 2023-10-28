import mongoose from "mongoose"
import { Entity ,Column, PrimaryGeneratedColumn} from "typeorm"
const TestSchema = new mongoose.Schema({
    title: String, 
    author: String,  
})

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

 
}

export const TestModel = mongoose.model("testModel", TestSchema)
