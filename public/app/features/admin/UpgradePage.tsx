import React from 'react';
import { css } from 'emotion';
import { NavModel } from '@grafana/data';
import Page from '../../core/components/Page/Page';
import { LicenseChrome } from './LicenseChrome';
import { LinkButton } from '@grafana/ui';
import { hot } from 'react-hot-loader';
import { StoreState } from '../../types';
import { getNavModel } from '../../core/selectors/navModel';
import { connect } from 'react-redux';

interface Props {
  navModel: NavModel;
}

export const UpgradePage: React.FC<Props> = ({ navModel }) => {
  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <UpgradeInfo editionNotice="您正在运行Grafana的开源版本。必须安装企业版才能启用企业功能。" />
      </Page.Contents>
    </Page>
  );
};

const titleStyles = { fontWeight: 500, fontSize: '26px', lineHeight: '123%' };

interface UpgradeInfoProps {
  editionNotice?: string;
}

export const UpgradeInfo: React.FC<UpgradeInfoProps> = ({ editionNotice }) => {
  const columnStyles = css`
    display: grid;
    grid-template-columns: 100%;
    column-gap: 20px;
    row-gap: 40px;

    @media (min-width: 1050px) {
      grid-template-columns: 50% 50%;
    }
  `;

  return (
    <LicenseChrome header="Grafana企业版" subheader="免费试用" editionNotice={editionNotice}>
      <div className={columnStyles}>
        <FeatureInfo />
        <ServiceInfo />
      </div>
    </LicenseChrome>
  );
};

const GetEnterprise: React.FC = () => {
  return (
    <div style={{ marginTop: '40px', marginBottom: '30px' }}>
      <h2 style={titleStyles}>获取Grafana企业版</h2>
      <CallToAction />
      <p style={{ paddingTop: '12px' }}>
        你可以免费试用 <strong>30天</strong>。放心<strong>在试用期结束5天之前</strong>我们会提醒您。
      </p>
    </div>
  );
};

const CallToAction: React.FC = () => {
  return (
    <LinkButton
      variant="primary"
      size="lg"
      href="https://grafana.com/contact?about=grafana-enterprise&utm_source=grafana-upgrade-page"
    >
      联系我们并获得免费试用
    </LinkButton>
  );
};

const ServiceInfo: React.FC = () => {
  return (
    <div>
      <h4>乐意效劳</h4>

      <List>
        <Item title="企业插件" image="public/img/licensing/plugin_enterprise.svg" />
        <Item title="关键SLA：2小时" image="public/img/licensing/sla.svg" />
        <Item title="无限的专家支持" image="public/img/licensing/customer_support.svg">
          24x7x365 通过提供支持
          <List nested={true}>
            <Item title="电子邮件" />
            <Item title="私有slack通道" />
            <Item title="电话" />
          </List>
        </Item>
        <Item title="Hand-in-hand support" image="public/img/licensing/handinhand_support.svg">
          在升级过程中
        </Item>
      </List>

      <div style={{ marginTop: '20px' }}>
        <strong>还包括:</strong>
        <br />
        保障，与Grafana Labs合作确定未来的优先级，并从Grafana核心团队进行培训。
      </div>

      <GetEnterprise />
    </div>
  );
};

const FeatureInfo: React.FC = () => {
  return (
    <div style={{ paddingRight: '11px' }}>
      <h4>增强功能</h4>
      <FeatureListing />
    </div>
  );
};

const FeatureListing: React.FC = () => {
  return (
    <List>
      <Item title="数据源权限" />
      <Item title="报告" />
      <Item title="SAML身份验证" />
      <Item title="增强的LDAP集成" />
      <Item title="团队同步">LDAP，GitHub OAuth，身份验证代理，Okta</Item>
      <Item title="白色标签" />
      <Item title="Grafana使用见解">
        <List nested={true}>
          <Item title="按搜索受欢迎程度对仪表盘进行排序" />
          <Item title="查找未使用的仪表板" />
          <Item title="仪表板使用情况统计抽屉" />
          <Item title="仪表板状态指示器" />
        </List>
      </Item>
      <Item title="企业插件">
        <List nested={true}>
          <Item title="Oracle" />
          <Item title="Splunk" />
          <Item title="Service Now" />
          <Item title="Dynatrace" />
          <Item title="New Relic" />
          <Item title="DataDog" />
          <Item title="AppDynamics" />
          <Item title="Amazon Timestream" />
        </List>
      </Item>
    </List>
  );
};

interface ListProps {
  nested?: boolean;
}

const List: React.FC<ListProps> = ({ children, nested }) => {
  const listStyle = css`
    display: flex;
    flex-direction: column;
    padding-top: 8px;

    > div {
      margin-bottom: ${nested ? 0 : 8}px;
    }
  `;

  return <div className={listStyle}>{children}</div>;
};

interface ItemProps {
  title: string;
  image?: string;
}

const Item: React.FC<ItemProps> = ({ children, title, image }) => {
  const imageUrl = image ? image : 'public/img/licensing/checkmark.svg';
  const itemStyle = css`
    display: flex;

    > img {
      display: block;
      height: 22px;
      flex-grow: 0;
      padding-right: 12px;
    }
  `;
  const titleStyle = css`
    font-weight: 500;
    line-height: 1.7;
  `;

  return (
    <div className={itemStyle}>
      <img src={imageUrl} />
      <div>
        <div className={titleStyle}>{title}</div>
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  navModel: getNavModel(state.navIndex, 'upgrading'),
});

export default hot(module)(connect(mapStateToProps)(UpgradePage));
