import { AppLayout } from '##/layout/AppLayout';
import { createBrowserRouter } from 'react-router-dom';
import { TestPageLayout } from '##/layout/TestPageLayout';
import { ConfigurationValues } from "##/view/Device/ConfigurationValues";
import { Contacts } from "##/view/Contacts";
import { CoverageAria } from "##/view/Device/CoverageAria";
import { Home } from "##/view/Home";
import { LogFiles } from "##/view/Device/LogFiles";
import { NetworkSettings } from "##/view/Device/NetworkSettings";
import { RfValues } from "##/view/Device/RfValues";
import { Device } from "##/view/Device";
import styles from "./index.module.scss";


export function getRouter(isMenuOpen:boolean){
  function getStyle():string{
    return isMenuOpen? styles.test : [styles.test, styles.testActive].join(' ');
  }

  return createBrowserRouter(
   [
   {
     path: "/",
     element: <AppLayout />,
     children: [
       {
         path: "device",
         element: <Device outerPositionClass={getStyle()}/>,
         children: [
           {
             path: "test",
             element: <TestPageLayout />,
           },
           {
             path: "coverage_aria",
             element: <CoverageAria outerPositionClass='' />,
           },
           {
             path: "rf_values",
             element: <RfValues outerPositionClass='' />,
           },
           {
             path: "configuration_values",
             element: <ConfigurationValues outerPositionClass='' />,
           },
           {
             path: "log_files",
             element: <LogFiles outerPositionClass='' />,
           },
           {
             path: "network_settings",
             element: <NetworkSettings outerPositionClass='' />,
           },
         ]
       },
       {
         path: "",
         element: <Home outerPositionClass={styles.home}/>
       },
       {
         path: "contacts",
         element: <Contacts outerPositionClass={ getStyle() }/>
       }
     ],
   },
   
 ]);

}
