declare module "*.hbs" {
  const tpl: (param?: any) => string;
  export default tpl;
}

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
