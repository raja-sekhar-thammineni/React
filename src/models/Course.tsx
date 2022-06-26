type Course = {
    id: string,
    courseCreator: string,
    courseDescription: string,
    discount: number,
    discountValidTill: string,
    price: number,
    tags: string[],
    title: string,
    where?:string
}

export default Course;
