export type TimeString = string;
export type UrlString = string;

export interface SearchItem {
  CreditCode: string | '';
  KeyNo: string;
  Name: string;
  No: string;
  OperName: string | '';
  StartDate: TimeString | '';
  Status: string | '';
}

export interface MerchantDetail {
  Address: string;
  BelongOrg: string;
  CheckDate: TimeString;
  CreditCode: string;
  EconKind: string;
  EndDate: TimeString | '';
  ImageUrl: UrlString;
  IsOnStock: string;
  KeyNo: string;
  Name: string;
  No: string;
  OperName: string;
  OrgNo: string;
  OriginalName: string[];
  Province: string;
  RegistCapi: string;
  Scope: string;
  StartDate: TimeString;
  Status: string;
  StockNumber: null | string;
  StockType: null | string;
  TeamEnd: TimeString;
  TermStart: TimeString;
  UpdatedDate: TimeString;
}
