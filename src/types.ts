export interface Vote {
    username: string;
    pollId: number;
    option: string;
}
  
export interface Option {
    caption: string;
    votes: Vote[];
}
  
export interface Poll {
    id: number;
    question: string;
    publishedAt: string;
    validUntil: string;
    voteOptions: Option[];
}
  