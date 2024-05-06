export interface DtoMenuDefinition {
    name: string;
    redirectTo: string;
    permission?: Array<string>;
    icon: OverridableComponent<SvgIconTypeMap<{},"svg">> & { muiName: string; };
}