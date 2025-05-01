import { OmitType } from "@nestjs/swagger";
import { QueryTransactionsDto } from "./transactions-query.dto";

export class QueryMyTransactionsDto extends OmitType(QueryTransactionsDto, ['userId', 'includeUser']) { }
