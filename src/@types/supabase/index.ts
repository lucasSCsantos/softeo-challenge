export type Procedure = {
  id: string;
  procedure: string;
  created_at: Date;
};

export type Pacient = {
  id: string;
  pacient: string;
  created_at: Date;
};

export interface Payment {
  id: string;
  procedure: string;
  pacient: string;
  installments: number;
  amount: number;
  startDate: Date;
  endDate: Date;
  installment_amount: number;
  created_at: Date;
}

export interface Database {
  public: {
    Tables: {
      procedures: {
        Row: {
          id: string;
          procedure: string;
          created_at: Date;
        };
        Insert: {
          procedure: string;
        };
        Update: {
          procedure: string;
        };
      };
      pacients: {
        Row: {
          id: string;
          pacient: string;
          created_at: Date;
        };
        Insert: {
          pacient: string;
        };
        Update: {
          pacient: string;
        };
      };
      payments: {
        Row: {
          id: string;
          procedure: string;
          pacient: string;
          installment: number;
          amount: number;
          date: Date;
          created_at: Date;
        };
        Insert: {
          procedure: string;
          pacient: string;
          installment: number;
          amount: number;
          date: Date;
        };
        Update: {
          procedure: string;
          pacient: string;
          installment: number;
          amount: number;
          date: Date;
        };
      };
    };
  };
}

// export interface PostgrestProcedure extends PostgrestResponse<any> {
//   data: Procedure[];
// }
