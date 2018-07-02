export class Users {
  constructor
    (
    public id: string,
    public fname: string,
    public lname: string,
    public bio: string,
    public image: string,
    public city: string,
    public state: string,
    public country: string,
    public company: string,
    public github: string,
    public twitter: string,
    public website: string,
    public postalcode: string,
    public member: boolean,
    public admin: boolean,
    public date: string
    ) { }
}
