import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "##/store/hooks";
import { contro_UI_Actions } from "##/store/slices/contro_UI_Slice";


interface SubOptionI {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null;
}
interface OptionsI {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  options: SubOptionI[]    
}
interface PropOption{
  option: OptionsI;
  index: number;
}
interface PropSubtitle {
  subOption: SubOptionI;
  index: number;
}
type ChildProps = {
  outerPositionClass: string;
  options: OptionsI[];
}


export const NavigateContent: React.FC<ChildProps> = ({outerPositionClass, options}) => {
  // const [getIndexOption, setIndexOption] = useState<null| number >(0)

  return (
    <div className={outerPositionClass}>
      <div className={styles.container}>
        <h3 className={styles.title}>Routing</h3>
        <div className={styles.body}>
          {
            options.map((item, index) => (
              <Option
                option={item}
                index={index}
                key={index + item.name + Math.random()}

              />
            ))
          }
        </div>
        
      </div>
    </div>
  );
}


const Option: React.FC<PropOption> = ({option, index,}) => {
  const numbOption = useAppSelector((state) => state.contro_UI.numbOption);
  const dispatch = useAppDispatch();
  const optionTitleWrapperRef = useRef<HTMLDivElement>(null)
  
  function isIpad(){
    const media_ipad_one = 500;
    const media_descTop_one = 950;
    const currentSize = window.innerWidth;
    return currentSize >= media_ipad_one && currentSize < media_descTop_one; 
  }


  function setIndexOption(){
    dispatch(contro_UI_Actions.setNumbSubOption(null))
    if(index === numbOption){
      dispatch(contro_UI_Actions.setNumbOption(null));   
    }else{
      dispatch(contro_UI_Actions.setNumbOption(index));
    }
  };
  function getStyleOne(){
    return index === numbOption 
      ? [styles.optionTitle, styles.optionTitleActive ].join(' ')
      : styles.optionTitle
  };
  function getStyleTwo(){
    return index === numbOption
      ? styles.mainIconsActive
      : styles.mainIcons
  }
  function getStyleThree(){
    if(isIpad()) return;
    const subOptionHeight = 3; // the same value should be in the styles
    const titleOptionHeight = 3
    const subOptionsHight = option.options.length * subOptionHeight;
    return index === numbOption
      ? {height: `calc(${subOptionsHight}rem + ${titleOptionHeight}rem)`}
      : {};
  }
  function getStyleFour(){
    if(isIpad()){
      return index === numbOption ?
        [styles.subOptions, styles.subOptionActive].join(' ')
        :
        styles.subOptions;
    }else{
      return styles.subOptions;
    }
  }

  return(
    <div 
      className={styles.option} 
      style={getStyleThree()}
    >
      <div 
        className={ styles.optionTitleWrapper }
        ref={ optionTitleWrapperRef }
        onClick={ setIndexOption }
      >
        <div className={ getStyleOne()}>
          <option.icon className={getStyleTwo()}/>
          <span>{ option.name }</span>
        </div>
      </div>
      <div className={getStyleFour()}>
        {
          option.options.map((item, index) =>
            <SubOption subOption={item} index={index} key={index + item.name + Math.random()}/>
          )
        }
      </div>
    </div>
  )
}


const SubOption: React.FC<PropSubtitle> = ({subOption, index}) => {
  const numbSubOption = useAppSelector((state) => state.contro_UI.numbSubOption);
  const dispatch = useAppDispatch();
  function setIndexOption(){
    if(index === numbSubOption){
      dispatch(contro_UI_Actions.setNumbSubOption(null));   
    }else{
      dispatch(contro_UI_Actions.setNumbSubOption(index));
    }
  };
  function getStyleOne(){
    return index === numbSubOption 
      ? [styles.sybOptTitle, styles.sybOptTitleActive ].join(' ')
      : styles.sybOptTitle
  };

  return(
    <div className={styles.sybOptTitleWrapper} 
      onClick={ setIndexOption }
    >
        <div className={getStyleOne()} >
          {
            subOption.icon
            &&
            <subOption.icon className={styles.subIcons}/>
          }
          <span>{subOption.name}</span>
        </div>
    </div>
  );
} 