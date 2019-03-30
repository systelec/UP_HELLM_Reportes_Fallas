'use strict';

const Alarma = use('App/Models/Alarma');
const MapaCausa = use('App/Models/MapaCausa');
const Database = use('Database');
const moment = require('moment');

class AlarmaController {
  async index({ request, response }) {
    let { page, sortBy, descending, perPage, search, searchField } = request.get();
    page = page || 1;
    sortBy = sortBy || 'fecha';
    descending = descending || 'ASC';
    perPage = perPage || 10;
    searchField = searchField || 'nombre';
    search = search || '';

    const alarmas = await Alarma.query()
      .orderBy(sortBy, descending)
      .where(searchField, 'like', `%${search}%`)
      .paginate(page, perPage);

    response.status(200).json(alarmas);
  }

  async show({ request, response, params: { id } }) {
    const alarma = await Alarma.findOrFail(id);

    if (!alarma) {
      response.status(404).json({
        message: 'Alarma no encontrada.',
        id
      });
      return;
    }
    response.status(200).json(alarma);
  }

  async reconocer({ request, response, params: { id } }) {
    const data = request.only([
      'detalle',
      'mapa_causa_id',
      'causa_personalizada',
      'tipo_equipo_id'
    ]);

    const alarma = await Alarma.find(id);

    if (!alarma) {
      response.status(404).json({
        message: 'Alarma no encontrada.',
        id
      });
      return;
    }
    alarma.reconocida = true;
    alarma.detalle = data.detalle || alarma.detalle;
    alarma.mapa_causa_id = data.mapa_causa_id || alarma.mapa_causa_id;
    alarma.fecha_reconocida = new Date();

    if (data.causa_personalizada !== '') {
      const causa = await MapaCausa.create({
        nombre: data.causa_personalizada,
        tipo_equipo_id: data.tipo_equipo_id || 0
      });

      alarma.mapa_causa_id = causa.id;
    }

    await alarma.save();

    response.status(200).json(alarma);
  }

  async sileniar({ request, response, params: { id } }) {
    const data = request.only(['detalle', 'mapa_causa_id']);

    // Falta logica para reconocer alarma

    response.status(200).json(alarma);
  }

  async reportes({ request, response }) {
    let { desde, hasta, tags, reconocidas } = request.get();
    tags = tags || '(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)';
    reconocidas = reconocidas || false;
    desde =
      desde ||
      new Date(
        moment()
          .add(-1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')
      );
    hasta = hasta || new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

    let alarmas = [];
    if (!reconocidas || reconocidas === 'false') {
      alarmas = await Database.raw(
        `SELECT [alarmas].[nombre] as nombre ,[alarmas].[grupo] as grupo ,[alarmas].[tag] ,[equipos].[nombre] as equipo ,sum([alarmas].[duracion]) as duracion ,count([alarmas].[id]) as cantidad FROM [dbo].[alarmas] INNER JOIN [dbo].[equipos] ON [dbo].[alarmas].[equipo_id] = [dbo].[equipos].[id] WHERE [alarmas].[fecha] BETWEEN ? AND ? AND [equipos].[tipo_equipo_id] IN ${tags} GROUP BY [alarmas].[nombre], [alarmas].[grupo], [alarmas].[tag], [equipos].[id], [equipos].[nombre] ORDER BY duracion DESC`,
        [desde, hasta]
      );
    } else {
      alarmas = await Database.raw(
        `SELECT [alarmas].[detalle] as nombre ,[alarmas].[grupo] as grupo ,[alarmas].[tag] ,[equipos].[nombre] as equipo ,sum([alarmas].[duracion]) as duracion ,count([alarmas].[id]) as cantidad FROM [dbo].[alarmas] INNER JOIN [dbo].[equipos] ON [dbo].[alarmas].[equipo_id] = [dbo].[equipos].[id] WHERE [alarmas].[fecha] BETWEEN ? AND ? AND [equipos].[tipo_equipo_id] IN ${tags} AND reconocida = 1 GROUP BY [alarmas].[detalle], [alarmas].[grupo], [alarmas].[tag], [equipos].[id], [equipos].[nombre] ORDER BY duracion DESC`,
        [desde, hasta]
      );
    }
    response.status(200).json(alarmas);
  }

  async indexSinReconocer({ request, response }) {
    let { page, sortBy, descending, perPage, desde, hasta, minTiempo } = request.get();
    page = page || 1;
    sortBy = sortBy || 'fecha';
    descending = descending || 'ASC';
    perPage = perPage || 100;
    minTiempo = minTiempo || 10;

    desde =
      desde ||
      new Date(
        moment()
          .add(-1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')
      );
    hasta = hasta || new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

    const alarmas = await Alarma.query()
      .with('equipo')
      .where('reconocida', false)
      .where('duracion', '>', minTiempo)
      .whereBetween('fecha', [desde, hasta])
      .orderBy(sortBy, descending)
      .paginate(page, perPage);

    response.status(200).json(alarmas);
  }

  async indexGrupoAlarmas({ request, response }) {
    let { page, sortBy, descending, perPage, search, searchField } = request.get();
    page = page || 1;
    sortBy = sortBy || 'tag';
    descending = descending || 'ASC';
    perPage = perPage || 100;
    searchField = searchField || 'tag';
    search = search || '';

    const desde = new Date(
      moment()
        .add(-360, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
    );
    const hasta = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

    const alarmas = await Database.raw(
      'SELECT [tag] ,[descripcion] ,[area] ,[considerada] ,[silenciada] FROM [dbo].[v_AlarmHistory] WHERE fecha BETWEEN ? AND ? GROUP BY tag, descripcion, area, considerada, silenciada',
      [desde, hasta]
    );

    response.status(200).json(alarmas);
  }
}

module.exports = AlarmaController;
