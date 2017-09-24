export class Course {
    title: string;
    language: string;

    $key: string;
    $exists: () => boolean;
}