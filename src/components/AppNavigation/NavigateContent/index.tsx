import React, { useState } from "react";
import styles from "./index.module.scss";


interface SubOptionI {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null;
}

interface OptionsI {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  options: SubOptionI[]    
}

type ChildProps = {
  outerPositionClass: string;
  options: OptionsI[];
}

export const NavigateContent: React.FC<ChildProps> = ({outerPositionClass, options}) => {
  const [getIndexOption, setIndexOption] = useState<null| number >(0)

  return (
    <div className={outerPositionClass}>
      <div className={styles.container}>
        <h3 className={styles.title}>settings</h3>
        <div className={styles.body}>
          {
            options.map((item, index) => (
              <Option
                option={item}
                index={index}
                indexSettings={ { getIndexOption, setIndexOption } }
                key={index + item.name + Math.random()}

              />
            ))
          }
        </div>
        
      </div>
    </div>
  );
}


interface PropOption{
  option: OptionsI;
  index: number;
  indexSettings: {
    getIndexOption: number | null;
    setIndexOption: React.Dispatch<React.SetStateAction<number | null>>;
  }
}

const Option: React.FC<PropOption> = ({option, index, indexSettings}) => {
  // console.log(option.icon);
  
  function setIndexOption(){
    if(indexSettings.getIndexOption === index){
      indexSettings.setIndexOption(null)   
    }else{
      indexSettings.setIndexOption(index)
    }
  }
  function getStyleOne(){
    return index === indexSettings.getIndexOption 
      ? [styles.optionTitle, styles.optionTitleActive ].join(' ')
      : styles.optionTitle
  }
  function getStyleTwo(){
    return index === indexSettings.getIndexOption
      ? styles.mainIconsActive
      : styles.mainIcons
  }

  return(
    <div 
      className={styles.option} 
      style={index === indexSettings.getIndexOption ? {height: "10rem", transition: "height 500ms ease 0ms"}: {height: 'none',transition: "height 500ms ease 0ms"}}
    >
      <div className={styles.optionTitleWrapper}
        onClick={setIndexOption}
      >
        <div className={ getStyleOne()}>
          <option.icon className={getStyleTwo()}/>
          <span>{ option.name }</span>
        </div>
      </div>
      <div className={styles.subOptions}>
        {
          option.options.map((item, index) =>
            <SubOption subOption={item} key={index + item.name + Math.random()}/>
          )
        }
      </div>
    </div>
  )
}

interface PropSubtitle {
  subOption: SubOptionI
}

const SubOption: React.FC<PropSubtitle> = ({subOption}) => {
  return(
    <div className={styles.sybOptTitleWrapper} >
        <div className={styles.sybOptTitle}>
          {
            subOption.icon
            &&
            <subOption.icon className={styles.mainIcons}/>
          }
          <span>{subOption.name}</span>
        </div>
    </div>
  );
} 